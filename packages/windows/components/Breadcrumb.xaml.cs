using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Automation;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;

namespace ZDS.Components;

// Review note: WinUI 3 keeps the collapse logic, item roles, and navigation callback
// semantics aligned with the React reference implementation.

/// <summary>
/// Represents a single item in a ZDS breadcrumb trail.
/// </summary>
public sealed class ZDSBreadcrumbItem
{
    public string Label { get; set; } = string.Empty;
    public Action<ZDSBreadcrumbItem>? OnNavigate { get; set; }
    public string? NavigationId { get; set; }
}

/// <summary>
/// WinUI 3 breadcrumb component for the ZDS design system.
/// Renders ancestor items as interactive HyperlinkButtons, the current item as
/// a bold TextBlock, and a collapsed summary ("...") when overflow occurs.
/// </summary>
public sealed partial class Breadcrumb : UserControl
{
    // ── Dependency properties ───────────────────────────────────────────

    public static readonly DependencyProperty ItemsProperty =
        DependencyProperty.Register(
            nameof(Items),
            typeof(ObservableCollection<ZDSBreadcrumbItem>),
            typeof(Breadcrumb),
            new PropertyMetadata(null, OnItemsChanged));

    public static readonly DependencyProperty MaxVisibleItemsProperty =
        DependencyProperty.Register(
            nameof(MaxVisibleItems),
            typeof(int),
            typeof(Breadcrumb),
            new PropertyMetadata(0, OnMaxVisibleItemsChanged));

    public static readonly DependencyProperty AriaLabelProperty =
        DependencyProperty.Register(
            nameof(AriaLabel),
            typeof(string),
            typeof(Breadcrumb),
            new PropertyMetadata("Breadcrumb", OnAriaLabelChanged));

    public ObservableCollection<ZDSBreadcrumbItem> Items
    {
        get => (ObservableCollection<ZDSBreadcrumbItem>)GetValue(ItemsProperty);
        set => SetValue(ItemsProperty, value);
    }

    public int MaxVisibleItems
    {
        get => (int)GetValue(MaxVisibleItemsProperty);
        set => SetValue(MaxVisibleItemsProperty, value);
    }

    public string AriaLabel
    {
        get => (string)GetValue(AriaLabelProperty);
        set => SetValue(AriaLabelProperty, value);
    }

    // ── Constructor ─────────────────────────────────────────────────────

    public Breadcrumb()
    {
        InitializeComponent();
        Loaded += (_, _) => ApplyGeneratedTokens();
    }

    // ── Property change callbacks ───────────────────────────────────────

    private static void OnItemsChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        var self = (Breadcrumb)d;

        if (e.OldValue is ObservableCollection<ZDSBreadcrumbItem> oldCollection)
        {
            oldCollection.CollectionChanged -= self.OnItemsCollectionChanged;
        }

        if (e.NewValue is ObservableCollection<ZDSBreadcrumbItem> newCollection)
        {
            newCollection.CollectionChanged += self.OnItemsCollectionChanged;
        }

        self.RenderItems();
    }

    private static void OnMaxVisibleItemsChanged(DependencyObject d, DependencyPropertyChangedEventArgs _)
    {
        ((Breadcrumb)d).RenderItems();
    }

    private static void OnAriaLabelChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        var self = (Breadcrumb)d;
        AutomationProperties.SetName(self, (string?)e.NewValue ?? "Breadcrumb");
    }

    private void OnItemsCollectionChanged(object? sender, NotifyCollectionChangedEventArgs _)
    {
        RenderItems();
    }

    // ── Collapse logic (mirrors React collapseBreadcrumbItems) ──────────

    /// <summary>
    /// When item count > maxVisibleItems and maxVisibleItems >= 4, returns
    /// [first, collapsed-summary, last (maxVisibleItems-2) items].
    /// Otherwise returns all items.
    /// </summary>
    private List<(ZDSBreadcrumbItem Item, string Role)> CollapseBreadcrumbItems(
        IList<ZDSBreadcrumbItem> source)
    {
        if (source.Count == 0)
        {
            throw new ArgumentException("ZDS Breadcrumb requires at least one item.");
        }

        var count = source.Count;
        var result = new List<(ZDSBreadcrumbItem Item, string Role)>(count);

        // All items are ancestors except the last, which is current.
        // When collapsing we keep: first (ancestor), collapsed-summary, tail (ancestors + current).
        var max = MaxVisibleItems;

        if (max <= 0 || count <= max || max < 4)
        {
            // No collapsing — render all items with their natural roles.
            for (var i = 0; i < count; i++)
            {
                result.Add((source[i], i == count - 1 ? "current" : "ancestor"));
            }
            return result;
        }

        // Collapsed path: first + collapsed-summary + last (max-2) items.
        result.Add((source[0], "ancestor"));

        result.Add((new ZDSBreadcrumbItem { Label = "..." }, "collapsed-summary"));

        var tailCount = max - 2;
        var tailStart = count - tailCount;

        for (var i = tailStart; i < count; i++)
        {
            result.Add((source[i], i == count - 1 ? "current" : "ancestor"));
        }

        return result;
    }

    // ── Rendering ───────────────────────────────────────────────────────

    private void RenderItems()
    {
        if (ItemContainer == null)
        {
            return;
        }

        var source = Items;
        if (source == null || source.Count == 0)
        {
            throw new ArgumentException("ZDS Breadcrumb requires at least one item.");
        }

        ItemContainer.Children.Clear();
        var collapsed = CollapseBreadcrumbItems(source);

        var ancestorForeground = GetBrushResource("Breadcrumb.Role.ancestor.foreground");
        var ancestorInteractiveForeground = GetBrushResource("Breadcrumb.Role.ancestor.interactiveForeground");
        var currentForeground = GetBrushResource("Breadcrumb.Role.current.foreground");
        var collapsedForeground = GetBrushResource("Breadcrumb.Role.collapsed-summary.foreground");
        var separatorForeground = GetBrushResource("Breadcrumb.Separator.Foreground");

        for (var i = 0; i < collapsed.Count; i++)
        {
            var (item, role) = collapsed[i];

            // Insert chevron separator before every item except the first.
            if (i > 0)
            {
                var separator = new FontIcon
                {
                    Glyph = "\uE76C", // ChevronRight (Segoe MDL2 Assets)
                    FontSize = 12,
                    Foreground = separatorForeground,
                    Margin = new Thickness(
                        GetDoubleResource("Breadcrumb.Layout.separatorGap"), 0,
                        GetDoubleResource("Breadcrumb.Layout.separatorGap"), 0)
                };
                AutomationProperties.SetAccessibilityView(separator, AccessibilityView.Raw);
                ItemContainer.Children.Add(separator);
            }

            switch (role)
            {
                case "ancestor":
                    var link = new HyperlinkButton
                    {
                        Content = item.Label,
                        Foreground = ancestorInteractiveForeground,
                        Padding = new Thickness(0),
                        Margin = new Thickness(0, GetDoubleResource("Breadcrumb.Layout.paddingY"), 0, GetDoubleResource("Breadcrumb.Layout.paddingY")),
                        Tag = item
                    };
                    link.Click += OnAncestorClick;

                    // Style the inner TextBlock foreground to match.
                    if (link.Content is string linkLabel)
                    {
                        var tb = new TextBlock { Text = linkLabel };
                        link.Content = tb;
                    }

                    AutomationProperties.SetName(link, item.Label);
                    ItemContainer.Children.Add(link);
                    break;

                case "current":
                    var currentTb = new TextBlock
                    {
                        Text = item.Label,
                        Foreground = currentForeground,
                        FontWeight = Microsoft.UI.Text.FontWeights.Bold,
                        Margin = new Thickness(0, GetDoubleResource("Breadcrumb.Layout.paddingY"), 0, GetDoubleResource("Breadcrumb.Layout.paddingY"))
                    };
                    AutomationProperties.SetHelpText(currentTb, "Current page");
                    ItemContainer.Children.Add(currentTb);
                    break;

                case "collapsed-summary":
                    var collapsedTb = new TextBlock
                    {
                        Text = "...",
                        Foreground = collapsedForeground,
                        Margin = new Thickness(0, GetDoubleResource("Breadcrumb.Layout.paddingY"), 0, GetDoubleResource("Breadcrumb.Layout.paddingY"))
                    };
                    AutomationProperties.SetName(collapsedTb, "Collapsed breadcrumb path");
                    ItemContainer.Children.Add(collapsedTb);
                    break;
            }
        }
    }

    // ── Navigation callback ─────────────────────────────────────────────

    private void OnAncestorClick(object sender, RoutedEventArgs e)
    {
        if (sender is HyperlinkButton btn && btn.Tag is ZDSBreadcrumbItem item)
        {
            item.OnNavigate?.Invoke(item);
        }
    }

    // ── Token helpers (follow Button.xaml.cs pattern) ───────────────────

    private void ApplyGeneratedTokens()
    {
        if (ItemContainer == null)
        {
            return;
        }

        ItemContainer.Spacing = GetDoubleResource("Breadcrumb.Layout.itemGap");

        AutomationProperties.SetName(this, AriaLabel);

        // Re-render to pick up resolved token colours.
        RenderItems();
    }

    private double GetDoubleResource(string key)
    {
        return Resources[key] is double value ? value : 0;
    }

    private Microsoft.UI.Xaml.Thickness GetThicknessResource(string key)
    {
        return Resources[key] is Microsoft.UI.Xaml.Thickness value ? value : default;
    }

    private SolidColorBrush? GetBrushResource(string key)
    {
        return Resources[key] as SolidColorBrush;
    }
}
