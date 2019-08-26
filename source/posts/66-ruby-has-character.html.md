---
title: Ruby has Character
date: 2018-05-31
tags: strings, unicode, stdlib, regex
commit: f38e2de90bdeab779bf95a73e3e36c068bebfa33
---

Ruby comes with good support for Unicode-related features. Read on if you want to learn more about important Unicode fundamentals and how to use them in Ruby…

…or just watch my talk from RubyConf 2017:<br/>
<span style="font-size: 140%">
[⑩ Unicode Characters You Should Know About as a 👩‍💻](https://www.youtube.com/watch?v=hlryzsdGtZo)
</span>

ARTICLE

## Ruby ♡ Unicode

- [Characters in Unicode](#characters-in-unicode)
  - [Codepoints & Encodings](#codepoints--encodings)
  - [Grapheme Clusters](#grapheme-clusters)
- [Normalization](#normalization)
  - [Confusables](#special-case-visual-confusable-characters)
- [Case-Mapping](#case-mapping)
  - [Case-Folding](#special-case-case-folding)
- [Regex Unicode Properties](#regex-unicode-property-matching)
  - [Emoji Regex](#special-case-emoji-matching)
- [Monospace Display Width](#monospace-display-width)
- [Unicode Special Codepoints](#unicode-special-codepoints)
  - [Invalid Codepoints](#invalid-codepoints)
  - [Unstandardized Codepoints](#unstandardized-codepoints)
  - [Control Characters](#control-characters)
  - [Ignorable Codepoints](#ignorable-codepoints)
- [CLI Tools for Codepoint Analysis](#cli-tools-for-codepoint-analysis)

<script src="/javascripts/d3.v4.min.js"></script>
<script>
  var dataCodepointsAssignment = {
    "name": "Codepoints",
    "children": [
      { "name": "Reserved", "size": 837775 },
      { "name": "Assigned",
        "children": [
          { "name": "Standardized", "size": 138869 },
          { "name": "Private Use", "size": 137468 }
        ]
      }
    ]
  }

  window.renderDiagram = function(data, domId){
    var svg = d3.select("#" + domId),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
        color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
        format = d3.format(",d");

    var treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([width, height])
        .round(true)
        .paddingInner(6);

      var root = d3.hierarchy(data)
          .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
          .sum(sumBySize)
          .sort(function(b, a) { return b.height - a.height || b.value - a.value; });

      treemap(root);

      var cell = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
          .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

      cell.append("rect")
          .attr("id", function(d) { return d.data.id; })
          .attr("width", function(d) { return d.x1 - d.x0; })
          .attr("height", function(d) { return d.y1 - d.y0; })
          .attr("fill", function(d) { return color(d.parent.data.id); });

      cell.append("text")
          .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
        .selectAll("tspan")
          .data(function(d) { return [d.data.name, d.data.size] })
        .enter().append("tspan")
          .attr("x", 8)
          .attr("y", function(d, i) { return 30 + i * 30; })
          .text(function(d) { return d; });

    function sumBySize(d) {
      return d.size;
    }
  }
</script>

## Characters in Unicode

Unicode has come a long way and is now available in version 12.1 ([core specification](https://www.unicode.org/versions/Unicode12.1.0/UnicodeStandard-12.1.pdf)). The standard defines a lot of things related to characters, however, it is not always easy to grasp what a *character* actually is. Is *Ǆ* a single character or not? What about non-Latin languages?

We will need some more fine-grained concepts to distinguish and talk about characters in Unicode:

- ***Codepoint:*** A base unit to construct *characters* from. Often this maps directly to a single *character*. Depending on the encoding, a codepoint might require multiple bytes.
- ***Grapheme cluster:*** Smallest linguistic unit, a user-perceived *character*, constructed out of one or multiple codepoints.
- ***Glyph:*** The actual rendered shape which represents the grapheme cluster

### Codepoints & Encodings

Codepoints are the base unit of Unicode: It is a number mapped to some meaning. Often this resolves to a single character:

    "\u{41}" # => "A"
    "\u{ABCD}" # => "ꯍ"
    "\u{1F6A1}" # => "🚡"

There are 1114112 (in hexadecimal: 0x110000) different codepoints. On byte-level, a codepoint can be represented in different ways, which depends on the *encoding* used. Popular encodings for Unicode are ***UTF-8***, ***UTF-16***, and ***UTF-32***, which all have different mechanisms of representing codepoints:

Codepoint   | Decimal | Glyph | Bytes UTF-8 | Bytes UTF-16LE | Bytes UTF-32LE
------------|---------|-------|-------------|----------------|---------------
**U+0041**  | 65      | `A`   | 41          | 41 00          | 41 00 00 00
**U+ABCD**  | 43981   | `ꯍ`   | EA AF 8D    | CD AB          | CD AB 00 00
**U+1F6A1** | 128673  | `🚡`   | F0 9F 9A A1 | 3D D8 A1 DE    | A1 F6 01 00
{:.table-15-15-10-20-20-X}

Here is an overview, without going into too much detail:

- ***UTF-8*** uses a dynamic number of bytes: While [ASCII characters](/56-us-ascii-8bit.html) fit into a single byte, it can use up to 4 bytes for higher codepoints.
- ***UTF-16*** uses 2 bytes, if possible, but has a 4 byte mechanism to represent higher codepoints.
- ***UTF-32*** is a direct representation of the codepoint and always uses 4 bytes, no logic is involved. It is also a little lavish, because even the largest codepoint **U+10FFFF** only uses 21 bit of information. As a consequence the last byte is always `00`.

You can visualize and learn about encodings on the command-line with the [unibits CLI utility](https://github.com/janlelis/unibits/).

The rest of this blog post will not deal with encodings and byte representations, but use codepoints as the smallest unit.

### Grapheme Clusters

A user-perceived character might be constructed out of multiple codepoints. There are a lot of *enclosing characters* (like [diacritics](https://en.wikipedia.org/wiki/Diacritic)) which get combined with the previous character to form a new one:

"Ä" = **U+0041** "A" + **U+0308** "◌̈"

An example from the Thai language:

"กำ" = **U+0E01** "ก" + **U+0E33** " ำ"

Emoji are another example of grapheme clusters that require multiple codepoints:

"👨🏻‍🍳"¹ = **U+1F468** "👨" + **U+1F3FB** "🏻" + **U+0200D** "‍" + **U+1F373** "🍳"

[Ruby 2.5 introduced a convenient way](https://bugs.ruby-lang.org/issues/13780) to iterate through all grapheme clusters:

    "abกำcd".grapheme_clusters # => ["a", "b", "กำ", "c", "d"]

There is also `/\X/`², a regex feature that you can use instead of the default `/./` to match for grapheme clusters instead of codepoints:

    "abกำcd".scan(/./) # => ["a", "b", "ก", "ำ", "c", "d"]
    "abกำcd".scan(/\X/) # => ["a", "b", "กำ", "c", "d"]

¹ Depending on the recentness of your rendering software, this is displayed as a single male cook<br/>
² This regex matcher was already introduced in earlier versions of Ruby

- [Unicode® Standard Annex #29: Unicode Text Segmentation](https://www.unicode.org/reports/tr29/)
- [RDoc: Grapheme clusters](https://ruby-doc.org/core/String.html#method-i-each_grapheme_cluster)
- [Onigmo documentation: `\X`](https://github.com/k-takata/Onigmo/blob/b8c3321cfdd5638c136ecff1fd139de24616a6aa/doc/RE#L117-L124)

## Normalization

<img src="images/keyboard.jpg" style="border: 1px solid #555; filter: grayscale(60%);" />

Sometimes, the Unicode standard defines multiple ways to describe the same (or a very similar) glyph. Let us revisit the example from above: the German letter "Ä", which is a "A" with two dots above. It is defined as codepoint **U+00C4**. At the same time, there is a mechanism to put two dots above just any letter using the *combining codepoint* **U+0308**. Combine it with "A" and you get "Ä" - A different representation, although semantically, it is the same character.

However, sometimes you need one canonical representation of a string. This is why the Unicode consortium came up with a normalization algorithm. It is [included in Ruby's standard library](https://stdgems.org/libraries/) and required automatically. There are several types of normalization forms:

Form       | Description
-----------|------------
***NFC***  | Default. The ***C*** stands for *composed*, it uses the composed format for graphemes (if available).
***NFD***  | The ***D*** stands for *decomposed*, it uses separate codepoints for such graphemes
***NFKC*** | Like ***NFC***, but uses compatibility mode, instead of canonical mode
***NFKD*** | Like ***NFD***, but uses compatibility mode, instead of canonical mode
{:.table-10-X}

*NFC*

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+00C4"]
    "Ä".unicode_normalize.codepoints.map{|c| "U+%04X"%c }
    # => ["U+00C4"]

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+0308"]
    "Ä".unicode_normalize.codepoints.map{ |c| "U+%04X"%c }
    # => ["U+00C4"]

    "A²".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+00B2"]
    "A²".unicode_normalize.codepoints.map{ |c| "U+%04X"%c }
    # =>  ["U+0041", "U+00B2"]

*NFD*

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+00C4"]
    "Ä".unicode_normalize(:nfd).codepoints.map{ |c| "U+%04X"%c }
    # => ["U+0041", "U+0308"]

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+0308"]
    "Ä".unicode_normalize(:nfd).codepoints.map{ |c| "U+%04X"%c }
    # => ["U+0041", "U+0308"]

    "A²".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+00B2"]
    "A²".unicode_normalize(:nfd).codepoints.map{ |c| "U+%04X"%c }
    # =>  ["U+0041", "U+00B2"]

*NFKC*

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+00C4"]
    "Ä".unicode_normalize(:nfkc).codepoints.map{ |c| "U+%04X"%c }
    # => ["U+00C4"]

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+0308"]
    "Ä".unicode_normalize(:nfkc).codepoints.map{ |c| "U+%04X"%c }
    # => ["U+00C4"]

    "A²".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+00B2"]
    "A²".unicode_normalize(:nfkc).codepoints.map{ |c| "U+%04X"%c }
    # =>  ["U+0041", "U+0032"]

*NFKD*

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+00C4"]
    "Ä".unicode_normalize(:nfkd).codepoints.map{ |c| "U+%04X"%c }
    # => ["U+0041", "U+0308"]

    "Ä".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+0308"]
    "Ä".unicode_normalize(:nfkd).codepoints.map{ |c| "U+%04X"%c }
    # => ["U+0041", "U+0308"]

    "A²".codepoints.map{ |c| "U+%04X"%c } # => ["U+0041", "U+00B2"]
    "A²".unicode_normalize(:nfkd).codepoints.map{ |c| "U+%04X"%c }
    # =>  ["U+0041", "U+0032"]

See the standard and documentation for more details, including the differences between the normalization forms:

- [Unicode® Standard Annex #15: Unicode Normalization Forms](https://unicode.org/reports/tr15/)
- [RDoc: unicode_normalize](https://ruby-doc.org/core-2.5.1/String.html#method-i-unicode_normalize)
- [Wikipedia: Unicode equivalence](https://en.wikipedia.org/wiki/Unicode_equivalence)

### Special Case: Visual Confusable Characters

Even in normalization form, there are characters which look very similar (sometimes even identical):

Codepoints A            | String A | String B | Codepoints B
------------------------|----------|----------|-------------
**U+003F** + **U+003F** | `??`     | `⁇`      | **U+2047**
**U+0043**              | `C`      | `С`      | **U+0421**
**U+0031**              | `1`      | `l`      | **U+006C**

The record holder is **LATIN SMALL LETTER O** which is currently linked to 75 other characters that it could be confused with:

<div style="font-size: 130%; margin-bottom: 1em">
ం ಂ ം ං ० ੦ ૦ ௦ ౦ ೦ ൦ ๐ ໐ ၀ ‎٥‎ ۵ ｏ ℴ 𝐨 𝑜 𝒐
𝓸 𝔬 𝕠 𝖔 𝗈 𝗼 𝘰 𝙤 𝚘 ᴏ ᴑ ꬽ ο 𝛐 𝜊 𝝄 𝝾 𝞸 σ 𝛔 𝜎 𝝈 𝞂 𝞼
ⲟ о ჿ օ ‎ס‎ ‎ه‎ ‎𞸤‎ ‎𞹤‎ ‎𞺄‎ ‎ﻫ‎ ‎ﻬ‎ ﻪ‎ ‎ﻩ‎ ‎ھ‎ ‎ﮬ‎ ‎ﮭ‎ ‎ﮫ‎ ‎ﮪ‎ ‎ہ‎ ‎ﮨ‎ ‎ﮩ‎ ‎ﮧ‎ ‎ﮦ‎
‎ە‎ ഠ ဝ 𐓪 𑣈 𑣗 𐐬
</div>

Detecting confusable characters is not built-in, it is possible with some gem support from **unicode-confusable**:

    require "unicode/confusable"
    Unicode::Confusable.confusable? "ℜ𝘂ᖯʏ", "Ruby" # => true

- [Unicode® Technical Standard #39: Unicode Security Mechanisms](https://unicode.org/reports/tr39/)
- [Gem: unicode-confusable](https://github.com/janlelis/unicode-confusable)

## Case-Mapping

Another Unicode topic is converting a word from lowercase to uppercase or vice versa. Up until Ruby 2.3, string methods like `#upcase`,`#capitalize`, `#downcase`, or `#swapcase` would just not work with non-ASCII characters:

    "ä".upcase # => "ä" # Ruby 2.3

This has been fixed and more recent versions of Ruby are able to do this out of the box:

    "ä".upcase # => "Ä"

The old, ASCII-only behavior can be achieved by passing the `:ascii` option:

    "ä".upcase(:ascii) # => "ä"

This is already much better than before, however, keep in mind that **case-mapping is a locale-dependent operation!** Not all languages use the same rules for converting between lower- and uppercase. For example, in most languages, the uppercase version of letter **i** is **I**:

    "i".upcase # => "I"

However, in Turkic languages, it's the letter `İ`:

    "i".upcase(:turkic) # => "İ"

Although Ruby supports special local case mapping rules, as of Ruby 2.5.1, only `:turkic` is supported. More options might be supported in the future.

- [Unicode® Standard Annex #44: Unicode Character Database / Section 5.6](https://unicode.org/reports/tr44/#Casemapping) (overview, see the respective sections in the [Unicode standard](https://www.unicode.org/versions/Unicode10.0.0/UnicodeStandard-10.0.pdf) itself)
- [RDoc: String#downcase](https://ruby-doc.org/core/String.html#method-i-downcase)

### Special Case: Case-Folding

There is another special option that you can pass to the `String#downcase` method: The `:fold` symbol. It will turn on case-folding, which should be used instead of the default case-mapping behavior if you are interested in comparing/ordering strings. The case-folding algorithm might produce a different output than the case-mapping one. Fer example, the German letter *sharp s* should be treated like two normal *s* letters in comparisons:

    "ẞ".downcase # => "ß"
    "ẞ".downcase(:fold) # => "ss"

There is another String method in Ruby core which makes use of case-folding: [String#casecmp?](https://ruby-doc.org/core/String.html#method-i-casecmp-3F)¹ which compares two strings ignoring their case:

     "A".casecmp? "a" # => true
     "ẞ".casecmp? "ss" # => true

¹ You should pay attention that its sister method [String#casecmp](https://ruby-doc.org/core/String.html#method-i-casecmp) only uses ASCII, despite the similar naming.

## Regex Unicode Property Matching

Ruby's regex engine supports matching of Unicode characteristics, like a characters general purpose (*general category*), its script, or in which codepoint range it is defined (*block*):

    "String, with: punctuation.".scan(/\p{P}/) # => [",", ":", "."]

See my previous articles for more details:

- [Episode 41: Proper Unicoding](/41-proper-unicoding.html) - More about the Unicode property syntax
- [Episode 30: Regex with Class](/30-regex-with-class.html) - Unicode behavior of regex matchers & POSIX-style character classes

### Special Case: Emoji Matching

Detecting emoji is especially complicated, because there are multiple mechanisms to build up the final emoji glyph. You can use the **unicode-emoji** gem to find all kinds of emoji:

    require "unicode/emoji"
    "😴 🛌🏽 🇵🇹 🤾🏽‍♀️".scan(Unicode::Emoji::REGEX) # => ["😴", "🛌🏽", "🇵🇹", "🤾🏽‍♀️"]

- [Unicode® Technical Standard #51: Unicode Emoji](https://www.unicode.org/reports/tr51/)
- [Gem: unicode-emoji](https://github.com/janlelis/unicode-emoji)

## Monospace Display-Width

Sometimes, you might find yourself in a situation where you would like to know the width of a character. But this is not easily possible, because the character width is just not defined! This, of course, leads to problems in fixed-width environments like terminals.

If you don't believe me, here are some wide characters for you to checkout:

Codepoint   | Glyph | Name
------------|-------|-----
**U+1242B** | 𒐫| CUNEIFORM NUMERIC SIGN NINE SHAR2
**U+12219** | 𒈙 | CUNEIFORM SIGN LUGAL OPPOSING LUGAL
**U+A9C4**  | ꧄    | JAVANESE PADA MADYA
**U+2E3B**  | ⸻    | THREE-EM DASH
**U+2031**  | ‱     | PER TEN THOUSAND SIGN
{:.table-15-15-X}

To complicate things further, some Asian characters are marked as *ambiguous* and get displayed wide or narrow, depending on the software displaying them. The **unicode-display_width** can help:

    require "unicode/display_width"

    Unicode::DisplayWidth.of("⚀") # => 1
    Unicode::DisplayWidth.of("一") # => 2

    # Ambiguous example
    Unicode::DisplayWidth.of("·", 1) # => 1
    Unicode::DisplayWidth.of("·", 2) # => 2

- [Unicode® Standard Annex #11: East Asian Width](https://www.unicode.org/reports/tr11/tr11-33.html)
- [Gem: unicode-display_width](https://github.com/janlelis/unicode-display_width)

## Unicode Special Codepoints

The last section will put the focus on four types of codepoints that require some attention. This is just a selection, there are many more notable codepoints and a good starting point to dig deeper is the [Awesome Codepoints](https://github.com/Codepoints/awesome-codepoints) list!

### Invalid Codepoints

There are two kinds of codepoints which are invalid. If you have these in your data, the data is invalid and [String#valid_encoding?](https://ruby-doc.org/core/String.html#method-i-valid_encoding-3F) will return false. Both of them are encoding-related:

*UTF-16 Surrogates*

The four byte mechanism that ***UTF-16*** uses to represent codepoints higher than **U+FFFF** (= 65 535) needs auxiliary codepoints. These are **U+D800..U+DFFF** and they are strictly forbidden in ***UTF-8*** and ***UTF-32***.

*Too Large Codepoints*

Any codepoint above **U+10FFFF** (= 1 114 111) is not allowed. The theoretical **UTF-32** maximum is **U+FFFFFFFF** (= 4 294 967 295) and four byte **UTF-8** could represent codepoints upto **U+1FFFFF** (= 2 097 151).

Ruby does not let you create these from literals:

    "\u{D800}" # => SyntaxError: (irb):52: invalid Unicode codepoint
    "\u{110000}" # => SyntaxError: (irb):54: invalid Unicode codepoint (too large)

But, if you really need to…, you can [use Array#pack](/4-what-the-pack.html):

    [0xD800].pack("U") # => "\xED\xA0\x80"
    [0x110000].pack("U") # => "\xF4\x90\x80\x80"

Ruby also includes a useful method that removes all invalid bytes, for example, surrogates:

    "a\xED\xA0\x80b" # => "a\xED\xA0\x80b"
    "a\xED\xA0\x80b".scrub # => "a���b"
    "a\xED\xA0\x80b".scrub("") # => "ab"

### Unstandardized Codepoints

Another group of codepoints that require extra care are the unstandardized ones. When you look at the following diagram, you will see that a lot of codepoints actually do not have a meaning assigned by the consortium (yet):

#### Codepoint Distribution as of Unicode 10

<svg id="codepoints" style="margin-bottom: 1em; max-width: 100%" width="670" height="397" viewBox="0 0 670 397" preserveAspectRatio="none" onload="renderDiagram(dataCodepointsAssignment, 'codepoints')"></svg>

#### Types of Unstandardized Codepoints

- **Private-Use Codepoints:** Meant for custom allocations by anyone. You will find vendor logos here, for example, **U+F8FF** for the Apple logo "" and **U+F200** for the ubuntu logo "". Both may only display correctly on the respective operating system with a proper font). Other uses of the private plane include assigning codepoints to fantasy languages like [Tengwar by J.R.R. Tolkien](http://www.evertype.com/standards/csur/).
- **Non-Characters:** A handful of codepoints that will never be assigned. Different than invalid codepoints, they are allowed to be used in your data. But they have no meaning.
- **Reserved Codepoints:** Will (or might) be assigned in a later version of Unicode

Type           | Count    | Codepoints   | Ruby Regex
---------------|----------|--------------|-----------
Private-Use    | 137 468¹ | **U+E000..U+F8FF**, **U+F0000..U+FFFFD**, **U+100000..U+10FFFD**                       | `/\p{private use}`
Non-Characters | 66       | **U+FDD0..U+FDEF** and the last two codepoints of each plane: **U+XFFFE**, **U+XFFFF** | `/\p{nchar}/`
Reserved       | 837 775  | (not yet assigned) | `/\p{unassigned}(?<!\p{nchar})/`
{:.table-15-15-30-X}

¹ Two additional private-use codepoints are **U+0091** and **U+0092**, but they are counted as control characters (see next section)

- [Unicode: Private-Use Characters, Noncharacters & Sentinels FAQ](https://www.unicode.org/faq/private_use.html)

### Control Characters

For historical reasons Unicode includes a set of 65 control codepoints. They were not defined by the Unicode Consortium and a lot of them are not universally standardized. However, some of them are extremely common, such as **U+0009**, the [tab-stop character](https://en.wikipedia.org/wiki/Tab_stop). It also contains the newline characters **U+0010** "\n" and **U+0013** "\r"; depending on your operating system, use one or both of them for [a newline](https://en.wikipedia.org/wiki/Newline).

Control characters are divided into the two sections ***C0***, covering **U+0000..U+001F**, and ***C1***, covering **U+0080..U+009F**. Furthermore, the [delete character](https://en.wikipedia.org/wiki/Delete_character) **U+007F** ␡ is also considered to be a control character.

In regexes, you can match for control characters with `\p{control}` or just `\p{cc}`.

#### List of C0 Control Codepoints

Codepoint  | Symbol | Ruby Escape | Name
-----------|--------|-------------| -----
**U+0000** | ␀ NUL  | `\0`        | *NULL*
**U+0001** | ␁ SOH  | `\u{1}`     | *START OF HEADING*
**U+0002** | ␂ STX  | `\u{2}`     | *START OF TEXT*
**U+0003** | ␃ ETX  | `\u{3}`     | *END OF TEXT*
**U+0004** | ␄ EOT  | `\u{4}`     | *END OF TRANSMISSION*
**U+0005** | ␅ ENQ  | `\u{5}`     | *ENQUIRY*
**U+0006** | ␆ ACK  | `\u{6}`     | *ACKNOWLEDGE*
**U+0007** | ␇ BEL  | `\a`        | *ALERT*
**U+0008** | ␈ BS   | `\b`        | *BACKSPACE*
**U+0009** | ␉ HT   | `\t`        | *CHARACTER TABULATION*
**U+000A** | ␊ LF   | `\n`        | *LINE FEED*
**U+000B** | ␋ VT   | `\v`        | *LINE TABULATION*
**U+000C** | ␌ FF   | `\f`        | *FORM FEED*
**U+000D** | ␍ CR   | `\r`        | *CARRIAGE RETURN*
**U+000E** | ␎ SS   | `\u{e}`     | *SHIFT OUT*
**U+000F** | ␏ SI   | `\u{f}`     | *SHIFT IN*
**U+0010** | ␐ DLE  | `\u{10}`    | *DATA LINK ESCAPE*
**U+0011** | ␑ DC1  | `\u{11}`    | *DEVICE CONTROL ONE*
**U+0012** | ␒ DC2  | `\u{12}`    | *DEVICE CONTROL TWO*
**U+0013** | ␓ DC3  | `\u{13}`    | *DEVICE CONTROL THREE*
**U+0014** | ␔ DC4  | `\u{14}`    | *DEVICE CONTROL FOUR*
**U+0015** | ␕ NAK  | `\u{15}`    | *NEGATIVE ACKNOWLEDGE*
**U+0016** | ␖ SYN  | `\u{16}`    | *SYNCHRONOUS IDLE*
**U+0017** | ␗ ETB  | `\u{17}`    | *END OF TRANSMISSION BLOCK*
**U+0018** | ␘ CAN  | `\u{18}`    | *CANCEL*
**U+0019** | ␙ EM   | `\u{19}`    | *END OF MEDIUM*
**U+001A** | ␚ SUB  | `\u{1a}`    | *SUBSTITUTE*
**U+001B** | ␛ ESC  | `\e`        | *ESCAPE*
**U+001C** | ␜ FS   | `\u{1c}`    | *INFORMATION SEPARATOR FOUR*
**U+001D** | ␝ GS   | `\u{1d}`    | *INFORMATION SEPARATOR THREE*
**U+001E** | ␞ RS   | `\u{1e}`    | *INFORMATION SEPARATOR TWO*
**U+001F** | ␟ US   | `\u{1f}`    | *INFORMATION SEPARATOR ONE*
{:.table-20-15-15-X}

<br/>

#### List of C1 Control Codepoints

Codepoint  | Symbol | Ruby Escape | Name
-----------|--------|-------------| -----
**U+0080** | PAD    | `\u{80}`    | *PADDING CHARACTER*
**U+0081** | HOP    | `\u{81}`    | *HIGH OCTET PRESET*
**U+0082** | BPH    | `\u{82}`    | *BREAK PERMITTED HERE*
**U+0083** | NBH    | `\u{83}`    | *NO BREAK HERE*
**U+0084** | IND    | `\u{84}`    | *INDEX*
**U+0085** | NEL¹   | `\u{85}`    | *NEXT LINE*¹
**U+0086** | SSA    | `\u{86}`    | *START OF SELECTED AREA*
**U+0087** | ESA    | `\u{87}`    | *END OF SELECTED AREA*
**U+0088** | HTS    | `\u{88}`    | *CHARACTER TABULATION SET*
**U+0089** | HTJ    | `\u{89}`    | *CHARACTER TABULATION WITH JUSTIFICATION*
**U+008A** | VTS    | `\u{8a}`    | *LINE TABULATION SET*
**U+008B** | PLD    | `\u{8b}`    | *PARTIAL LINE FORWARD*
**U+008C** | PLU    | `\u{8c}`    | *PARTIAL LINE BACKWARD*
**U+008D** | RI     | `\u{8d}`    | *REVERSE LINE FEED*
**U+008E** | SS2    | `\u{8e}`    | *SINGLE SHIFT TWO*
**U+008F** | SS3    | `\u{8f}`    | *SINGLE SHIFT THREE*
**U+0090** | DCS    | `\u{90}`    | *DEVICE CONTROL STRING*
**U+0091** | PU1    | `\u{91}`    | *PRIVATE USE ONE*
**U+0092** | PU2    | `\u{92}`    | *PRIVATE USE TWO*
**U+0093** | STS    | `\u{93}`    | *SET TRANSMIT STATE*
**U+0094** | CCH    | `\u{94}`    | *CANCEL CHARACTER*
**U+0095** | MW     | `\u{95}`    | *MESSAGE WAITING*
**U+0096** | SPA    | `\u{96}`    | *START OF GUARDED AREA*
**U+0097** | EPA    | `\u{97}`    | *END OF GUARDED AREA*
**U+0098** | SOS    | `\u{98}`    | *START OF STRING*
**U+0099** | SGC    | `\u{99}`    | *SINGLE GRAPHIC CHARACTER INTRODUCER*
**U+009A** | SCI    | `\u{9a}`    | *SINGLE CHARACTER INTRODUCER*
**U+009B** | CSI    | `\u{9b}`    | *CONTROL SEQUENCE INTRODUCER*
**U+009C** | ST     | `\u{9c}`    | *STRING TERMINATOR*
**U+009D** | OSC    | `\u{9d}`    | *OPERATING SYSTEM COMMAND*
**U+009E** | PM     | `\u{9e}`    | *PRIVACY MESSAGE*
**U+009F** | APC    | `\u{9f}`    | *APPLICATION PROGRAM COMMAND*
{:.table-20-15-15-X}

¹ The *NEXT LINE* control character was introduced to have an universal codepoint for [newlines](https://en.wikipedia.org/wiki/Newline). This goal was not reached. Still, on some systems (for example, my ubuntu machine), it will actually create a newline!

The **characteristics** gem lets you check if a codepoint belongs to a specific control group:

    Characteristics.create("\u{80}").c0? # => false
    Characteristics.create("\u{80}").c1? # => true

- [Wikipedia has more info on every control codepoint](https://en.wikipedia.org/wiki/C0_and_C1_control_codes)
- [Gem: characteristics](https://github.com/janlelis/characteristics)

### Ignorable Codepoints

My last example of special codepoints are the so called ignorable codepoints. Their meaning varies, but most of them are invisible and they are often not treated as a whitespace by Unicode. They are ignorable in the sense that if your Unicode rendering engine does not know how to display it, it should *just display nothing*. The ignorable property is even given to some ranges of *unassigned* codepoints¹ (which is usually not done).

You can check for ignorable codepoints using the `/\p{default ignorable code point}/` (or its shorthand `\p{di}`) regex.

For example, the following piece of code is made out of [tag characters](https://en.wikipedia.org/wiki/Tags_(Unicode_block)), which resemble all [ASCII characters](/56-us-ascii-8bit.html), but as ignorable characters:

    eval "󠁰󠁵󠁴󠁳󠀠󠀧󠁉󠁤󠁩󠁯󠁳󠁹󠁮󠁣󠁲󠁡󠁴󠁩󠁣󠀠󠁕󠁮󠁩󠁣󠁯󠁤󠁥󠀧".codepoints.map{ |c| c - 0xE0000 }.pack("U*")

This program will output `Idiosyncratic Unicode`

¹ The whole range of **E0000..E0FFF** is ignorable!

## CLI Tools for Codepoint Analysis

I hope that you are now ready to closely inspect your own Unicode data! To help you do so, I made a few command-line tools, I hope you like them:

- [uniscribe](https://github.com/janlelis/uniscribe) for codepoint analysis
- [unibits](https://github.com/janlelis/unibits) for encoding analysis, also supports a lot of non-Unicode encodings
- [unicopy](https://github.com/janlelis/unicopy) for converting & copying codepoints
