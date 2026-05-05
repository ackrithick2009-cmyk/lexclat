$file = "src\services\geminiService.ts"
$content = Get-Content $file -Raw
$updated = $content -replace 'await ai\.models\.generateContent', 'await getAI().models.generateContent'
Set-Content -Path $file -Value $updated -NoNewline
Write-Host "Done. Replaced $(($content -split 'await ai').Count - 1) occurrences."
