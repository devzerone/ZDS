using System.Collections.ObjectModel;
using Microsoft.UI.Xaml;
using ZDS.Components;

namespace ZDS.Demo;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        SetupBreadcrumbs();
    }

    private void SetupBreadcrumbs()
    {
        // 1-item path
        Breadcrumb1.Items = new ObservableCollection<ZDSBreadcrumbItem>
        {
            new() { Label = "Home" }
        };

        // 4-item path
        Breadcrumb4.Items = new ObservableCollection<ZDSBreadcrumbItem>
        {
            new() { Label = "Home", OnNavigate = item => Log("Navigated to Home") },
            new() { Label = "Products", OnNavigate = item => Log("Navigated to Products") },
            new() { Label = "Category", OnNavigate = item => Log("Navigated to Category") },
            new() { Label = "Detail" }
        };

        // 8-item path with maxVisibleItems=5
        Breadcrumb8.Items = new ObservableCollection<ZDSBreadcrumbItem>
        {
            new() { Label = "Home", OnNavigate = item => Log("Home") },
            new() { Label = "Library", OnNavigate = item => Log("Library") },
            new() { Label = "Section A", OnNavigate = item => Log("Section A") },
            new() { Label = "Section B", OnNavigate = item => Log("Section B") },
            new() { Label = "Chapter 1", OnNavigate = item => Log("Chapter 1") },
            new() { Label = "Chapter 2", OnNavigate = item => Log("Chapter 2") },
            new() { Label = "Page", OnNavigate = item => Log("Page") },
            new() { Label = "Current" }
        };
        Breadcrumb8.MaxVisibleItems = 5;
    }

    private static void Log(string message)
    {
        System.Diagnostics.Debug.WriteLine($"[Breadcrumb] {message}");
    }
}
