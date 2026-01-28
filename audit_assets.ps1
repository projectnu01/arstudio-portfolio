# Audit Large Files Script
# Run this to see which files are taking up the most space

$path = Get-Location
Get-ChildItem -Path $path -Recurse -File | 
    Sort-Object Length -Descending | 
    Select-Object Name, @{Name="Size(MB)";Expression={"{0:N2}" -f ($_.Length / 1MB)}}, Directory |
    Select-Object -First 20 |
    Format-Table -AutoSize

Write-Host "These are your largest files. Compressing them will speed up your site!" -ForegroundColor Yellow
