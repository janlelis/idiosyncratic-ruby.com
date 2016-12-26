---
title: Escape Back Referencing
date: 2016-05-29
tags: regex, syntax
commit: 0998097e41369176ba27870f9b78cbfdfe84b363
---

Ruby has more than one way to access additional information about the most recent regex match, like captured groups. One way is using the [special variables <code>$`</code>, `$&`, `$'`, `$1` - `$9`, `$+`](/9-globalization.html), and also in the [MatchData](http://ruby-doc.org/core-2.4.0/MatchData.html) object `$~`. They become available after using a method that matched a regex, or when the method supports a block, they are already available in the block.

ARTICLE

However, there is also a special string processing supported by the string replacement methods [String#gsub](ruby-doc.org/core-2.4.0/String.html#method-i-gsub) and [String#sub](ruby-doc.org/core-2.4.0/String.html#method-i-sub). The replacement string (second parameter) can contain **back references**, which behave similarly to their corresponding special variable:

    "Idiosyncratic Ruby".sub(/(\w+) (\w+)/, '\2 \1') # => "Ruby Idiosyncratic"

## Special Regex Variables & Back References

Perlish | Back-Ref        | Effect          | Example
--------|-----------------|-----------------|--------
`$&`    | `'\&'`, `'\0'`¹ | Match           | `"abc".gsub(/.*/, '\&\&') # => "abcabc"`
<code>$`</code>|<code>'\`'</code>|Pre Match| <code>"abc".gsub(/b/, '\`') # => "aac"</code>
`$'`    | `'\\\''`        | Post Match      | `"abc".gsub(/b/, '\\\'') # => "acc"`
`$1`²   | `'\1'`          | 1st Capture     | `"abc".gsub(/(a)b(c)/, '\1') # => "a"`
`$+`    | `'\+'`          | Last Capture    | `"abc".gsub(/(a)b(c)/, '\+') # => "c"`
`$~[:name]`| `'\k<name>'` | Named Capture   | `"abc".gsub(/(?<name>a)bc/, '\k<name>') # => "a"`
{:.table-15-15-20-X}

## Escaping

Ruby is absolutely confusing when it comes to how to escape back references. You have to use one or two backspaces when using single quoted strings. You have to use two (or sometimes three) backspaces when using double quoted strings. Escaping `\'` needs special attention³:

X  | `'\X'`       | `'\\X'`      | `'\\\X'`   | `"\X"`    | `"\\X"`      | `"\\\X"`     | `"\\\\X"`
---|--------------|--------------|------------|-----------|--------------|--------------|----------
&  | Match        | Match        | `"\\&"`    | `"&"`     | Match        | Match        | `"\\&"`
\` | Pre-Match|Pre-Match|<code>"\\`"</code>|<code>"`"</code>| Pre-Match  | Pre-Match    | <code>"\\`"</code>
'  | `"'"`        | -            | Post-Match | `"'"`     | Post-Match   | Post-Match   | `"\\'"`
0¹ | Match        | Match        | `"\\0"`    | `"\u0000"`| Match        | `"\\\u0000"` | `"\\0"`
1² | 1st Capture  | 1st Capture  | `"\\1"`    | `"\u0001"`| 1st Capture  | `"\\\u0001"` | `"\\1"`
+  | Last Capture | Last Capture | `"\\+"`    | `"+"`     | Last Capture | Last Capture | `"\\+"`
k&lt;name&gt;|Named Capture|Named Capture|`"\\k<name>"`|`"k<name>"`|Named Capture|Named Capture|`"\\k<name>"`

¹ Although the global variable `$0` is not related to regex matching, `\0` is a valid back reference.<br/>
² Same for 2-9: Nth Capture<br>
³ If you want to replace `'` with `\'` (backspace quote, no back-ref), the replacement string is: `'\\\\\''`