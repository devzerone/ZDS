namespace ZDS.Components;

// Review note: WinUI 3 keeps label-required, loading lock, disabled discoverability,
// and the shared variant/size names aligned with the shared contract.
public sealed partial class Button
{
    public Button()
    {
        InitializeComponent();
    }

    public string Variant { get; set; } = "primary";
    public string Size { get; set; } = "medium";
    public string State { get; set; } = "default";
    public bool Loading { get; set; }
    public bool Disabled { get; set; }
    public string Label { get; set; } = "Continue";

    public bool InteractionAllowed => !Loading && !Disabled;
}
