# fix-cache-busting.ps1
# Adds cache-busting, cache-control meta tags, and bfcache handler to all pages

$version = "v=20260525"

# The bfcache handler script — forces reload when browser serves from bfcache
$bfcacheScript = @"

<!-- Cache Buster & bfcache Fix -->
<script>
(function(){
  // Force reload when page is restored from bfcache (back/forward nav)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      window.location.reload();
    }
  });
})();
</script>
"@

# Cache-control meta tags to insert after <meta name="viewport"
$cacheMeta = @"
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
"@

function Fix-Page {
    param([string]$filePath)
    
    if (-not (Test-Path $filePath)) {
        Write-Host "SKIP (not found): $filePath"
        return
    }
    
    $content = [System.IO.File]::ReadAllText($filePath)
    $changed = $false
    
    # 1. Add cache-busting to CSS links (local files only, not CDN)
    # Match href="./something.css" or href="../something.css" or href="../../something.css"
    $pattern = '(href="(?:\.\.?/)+[^"]+\.css)"'
    $replacement = "`$1?$version`""
    $newContent = [regex]::Replace($content, $pattern, $replacement)
    if ($newContent -ne $content) {
        $content = $newContent
        $changed = $true
        Write-Host "  [CSS bust] $filePath"
    }
    
    # 2. Add cache-busting to JS src links (local files only)
    $pattern = '(src="(?:\.\.?/)+[^"]+\.js)"'
    $replacement = "`$1?$version`""
    $newContent = [regex]::Replace($content, $pattern, $replacement)
    if ($newContent -ne $content) {
        $content = $newContent
        $changed = $true
        Write-Host "  [JS bust] $filePath"
    }
    
    # 3. Add cache-control meta tags (after viewport meta, if not already present)
    if ($content -notmatch 'Cache-Control') {
        $content = $content -replace '(<meta name="viewport"[^>]*>)', "`$1`n$cacheMeta"
        $changed = $true
        Write-Host "  [Cache meta] $filePath"
    }
    
    # 4. Add bfcache handler (before </body>, if not already present)
    if ($content -notmatch 'pageshow') {
        $content = $content -replace '(<link rel="stylesheet" href="[^"]*mobile-fix\.css[^"]*">)', "`$1$bfcacheScript"
        $changed = $true
        Write-Host "  [bfcache fix] $filePath"
    }
    
    if ($changed) {
        [System.IO.File]::WriteAllText($filePath, $content)
        Write-Host "UPDATED: $filePath"
    } else {
        Write-Host "NO CHANGES: $filePath"
    }
}

# Main pages
$mainPages = @(
    'index.html', 'about.html', 'products.html', 'seeds.html',
    'our-crops.html', 'blogs.html', 'contact.html'
)

foreach ($page in $mainPages) {
    Fix-Page -filePath "e:\greenspout\$page"
}

# Blog sub-pages
$blogDirs = @(
    'eco-friendly-habits-small-changes-for-a-greener-life',
    'ksfl-agros-guide-to-zerowaste-farming',
    'starting-your-first-organic-garden-a-beginners-guide',
    'top-5-lessons-learned-from-our-organic-farming-workshops'
)

foreach ($dir in $blogDirs) {
    Fix-Page -filePath "e:\greenspout\$dir\index.html"
}

# Crop detail pages
$cropDirs = Get-ChildItem -Path 'e:\greenspout\our-crops' -Directory -ErrorAction SilentlyContinue
foreach ($dir in $cropDirs) {
    $indexPath = Join-Path $dir.FullName 'index.html'
    Fix-Page -filePath $indexPath
}

Write-Host "`nAll done!"
