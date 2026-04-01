namespace ZDS.Components;

// Review note: WinUI 3 keeps label-required, loading lock, disabled discoverability,
// and the shared variant/size names aligned with the shared contract.
public sealed partial class Button
{
    public Button()
    {
        InitializeComponent();
        LabelSlot.Text = Label;
        Loaded += (_, _) => ApplyGeneratedTokens();
    }

    public string Variant { get; set; } = "primary";
    public string Size { get; set; } = "medium";
    public string State { get; set; } = "default";
    public bool IsLoading { get; set; }
    public bool IsDisabled { get; set; }
    public string Label { get; set; } = "Continue";

    public bool InteractionAllowed => !IsLoading && !IsDisabled;

    private void ApplyGeneratedTokens()
    {
        var normalizedState = IsLoading ? "loading" : IsDisabled ? "disabled" : State;

        RootButton.MinHeight = GetDoubleResource($"Button.Size.{Size}.MinHeight");
        RootButton.Padding = GetThicknessResource($"Button.Size.{Size}.Padding");
        RootStack.Spacing = GetDoubleResource($"Button.Size.{Size}.Gap");
        LabelSlot.FontSize = GetDoubleResource($"Button.Size.{Size}.LabelFontSize");
        RootButton.Background = GetBrushResource($"Button.Variant.{Variant}.{normalizedState}.Background");
        RootButton.BorderBrush = GetBrushResource($"Button.Variant.{Variant}.{normalizedState}.Border");
        LabelSlot.Foreground = GetBrushResource($"Button.Variant.{Variant}.{normalizedState}.Foreground");
        RootButton.BorderThickness = new Thickness(1);
        RootButton.CornerRadius = new CornerRadius(GetDoubleResource($"Button.Size.{Size}.CornerRadius"));
    }

    private double GetDoubleResource(string key)
    {
        return Resources[key] is double value ? value : 0;
    }

    private Thickness GetThicknessResource(string key)
    {
        return Resources[key] is Thickness value ? value : default;
    }

    private Microsoft.UI.Xaml.Media.SolidColorBrush? GetBrushResource(string key)
    {
        return Resources[key] as Microsoft.UI.Xaml.Media.SolidColorBrush;
    }
}
