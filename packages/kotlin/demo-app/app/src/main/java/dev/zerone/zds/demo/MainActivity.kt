package dev.zerone.zds.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.tooling.preview.Preview
import zds.breadcrumb.ZDSBreadcrumbItem
import zds.breadcrumb.zdsBreadcrumb

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Scaffold { padding ->
                    BreadcrumbDemo(modifier = Modifier.padding(padding))
                }
            }
        }
    }
}

@Composable
fun BreadcrumbDemo(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(32.dp)
    ) {
        Text("ZDS Breadcrumb Demo", style = MaterialTheme.typography.headlineSmall)

        // 1-item path (no separators)
        Text("1 item:", style = MaterialTheme.typography.labelMedium)
        zdsBreadcrumb(
            items = listOf(
                ZDSBreadcrumbItem(label = "Home")
            )
        )

        // 4-item path (all visible)
        Text("4 items:", style = MaterialTheme.typography.labelMedium)
        zdsBreadcrumb(
            items = listOf(
                ZDSBreadcrumbItem(label = "Home", onNavigate = { println("Home") }),
                ZDSBreadcrumbItem(label = "Products", onNavigate = { println("Products") }),
                ZDSBreadcrumbItem(label = "Category", onNavigate = { println("Category") }),
                ZDSBreadcrumbItem(label = "Detail")
            )
        )

        // 8-item path with maxVisibleItems=5 (first + "..." + last 3)
        Text("8 items, maxVisible=5:", style = MaterialTheme.typography.labelMedium)
        zdsBreadcrumb(
            items = listOf(
                ZDSBreadcrumbItem(label = "Home", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Library", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Section A", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Section B", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Chapter 1", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Chapter 2", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Page", onNavigate = {}),
                ZDSBreadcrumbItem(label = "Current")
            ),
            maxVisibleItems = 5
        )
    }
}

@Preview(showBackground = true)
@Composable
fun BreadcrumbDemoPreview() {
    MaterialTheme {
        BreadcrumbDemo()
    }
}
