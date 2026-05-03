$files = @("about.html", "blogs.html", "extracted_products_subpage.html", "index.html", "preview.html", "products.html", "seeds.html", "site/index.html")
foreach ($f in $files) {
    $path = "e:\greenspout\" + $f
    $content = [System.IO.File]::ReadAllText($path)
    $content = $content.Replace("199 Oakway Lane, Woodland Hills, CA 91303", "1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh")
    $content = $content.Replace("১৯৯ ওকওয়ে লেন, উডল্যান্ড হিলস, সিএ ৯১৩০৩", "১২৪০/৭ কাজীপাড়া মিরপুর, ১০, ঢাকা, বাংলাদেশ")
    $content = $content.Replace("(347) 438-7215", "+8801715249371")
    $content = $content.Replace("(৩৪৭) ৪৩৮-৭২১৫", "+৮৮০১৭১৫২৪৯৩৭১")
    [System.IO.File]::WriteAllText($path, $content)
}
