# inject-mobile-css.ps1
# Injects mobile-fix.css link before </body> in all HTML pages

$rootLink = '<link rel="stylesheet" href="./assets/css/mobile-fix.css">'
$blogLink = '<link rel="stylesheet" href="../assets/css/mobile-fix.css">'
$cropLink = '<link rel="stylesheet" href="../../assets/css/mobile-fix.css">'

function Inject-CssLink {
    param([string]$filePath, [string]$linkTag)
    
    if (-not (Test-Path $filePath)) {
        Write-Host "SKIP (not found): $filePath"
        return
    }
    
    $content = [System.IO.File]::ReadAllText($filePath)
    
    if ($content -match 'mobile-fix\.css') {
        Write-Host "SKIP (already has): $filePath"
        return
    }
    
    $content = $content.Replace('</body>', "$linkTag`n</body>")
    [System.IO.File]::WriteAllText($filePath, $content)
    Write-Host "UPDATED: $filePath"
}

# Main pages
$mainPages = @(
    'index.html', 'about.html', 'products.html', 'seeds.html',
    'our-crops.html', 'blogs.html', 'contact.html'
)

foreach ($page in $mainPages) {
    Inject-CssLink -filePath "e:\greenspout\$page" -linkTag $rootLink
}

# Blog sub-pages
$blogDirs = @(
    'eco-friendly-habits-small-changes-for-a-greener-life',
    'ksfl-agros-guide-to-zerowaste-farming',
    'starting-your-first-organic-garden-a-beginners-guide',
    'top-5-lessons-learned-from-our-organic-farming-workshops'
)

foreach ($dir in $blogDirs) {
    Inject-CssLink -filePath "e:\greenspout\$dir\index.html" -linkTag $blogLink
}

# Crop detail pages
$cropDirs = Get-ChildItem -Path 'e:\greenspout\our-crops' -Directory -ErrorAction SilentlyContinue
foreach ($dir in $cropDirs) {
    $indexPath = Join-Path $dir.FullName 'index.html'
    Inject-CssLink -filePath $indexPath -linkTag $cropLink
}

Write-Host "`nAll done!"
