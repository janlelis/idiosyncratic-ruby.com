---
title: What the Pack?
date: 2015-05-04
tags: core, strings, encoding
commit: fea958eff6b85935ea3a8a4974c2548e08abca2e
---

[a](#a--arbitrary-string)
[A](#a--arbitrary-string-clean-null-bytes)
[b](#b--bit-string-little-endian)
[B](#b--bit-string-big-endian)
[c](#c--a-signed-integer-per-byte)
[C](#c--an-unsigned-integer-per-byte)
[d](#d-d--a-float-double-precision-native-endian)
[D](#d-d--a-float-double-precision-native-endian)
[e](#e--a-float-single-precision-little-endian)
[E](#e--a-float-double-precision-little-endian)
[F](#f--a-float-single-precision-native-endian)
[g](#g--a-float-single-precision-big-endian)
[G](#g--a-float-double-precision-big-endian)
[h](#h--hex-string-little-endian)
[H](#h--hex-string-big-endian)
[l](#l--a-signed-integer-per-4-bytes)
[L](#l--an-unsigned-integer-per-4-bytes)
[m](#m--base64-encoding-rfc-2045)
[m0](#m0--base64-encoding-rfc-4648)
[M](#m--quoted-printable--mime-encoding-rfc2045)
[n](#n--an-unsigned-integer-per-2-bytes-big-endian-similar-to-s)
[N](#n--a-signed-integer-per-4-bytes-big-endian-similar-to-l)
[p](#p--pointer-to-null-terminated-string)
[P](#p--pointer-to-fixed-length-string)
[q](#q--a-signed-integer-per-8-bytes)
[Q](#q--an-unsigned-integer-per-8-bytes)
[s](#s--a-signed-integer-per-2-bytes)
[S](#s--an-unsigned-integer-per-2-bytes)
[u](#u--uu-encoding)
[U](#u--utf-8-characters)
[v](#v--an-unsigned-integer-per-2-bytes-little-endian-similar-to-s)
[V](#v--a-signed-integer-per-4-bytes-little-endian-similar-to-l)
[w](#w--ber-compression)
[x](#x--skip-byte-fill-with-null-byte-when-packing)
[X](#x--move-a-byte-back)
[Z](#z--null-terminated-string)
[@](#go-to-position)
[!](#integer-directives)
[*](#pack-template-format)
[<](#a-note-on-byte-order-big-endian-vs-little-endian)
[>](#a-note-on-byte-order-big-endian-vs-little-endian)
[_](#integer-directives)

Ruby comes equipped with a powerful option for low level string manipulation: `String#unpack` and its counter part `Array#pack`. Today's episode takes a closer look.

ARTICLE

The general way how `String#unpack` is used is this:

    "a string".unpack("pack template with directives")
    # => [...]

The string contains some data in a specific format, which you "unpack" using a format specification. The format specification is defined in the pack template. The result is an array that contains the same data (or parts of it), but in a different representation. Take a look at this very simple example, which converts a four-letter ASCII string into its integer based byte representation:

    "Ruby".unpack("C C C C")
    # => [82, 117, 98, 121]

`Array#pack` works the other way around, so if you have the integer byte representation, it will convert it to real bytes in a string:

    [82, 117, 98, 121].pack("C C C C")
    # => "Ruby"

## Pack Template Format

The format of the pack template (`"C C C C"` in the example above) might be unfamiliar, but it is not too complicated. It is a series of letters that describe how to interpret the next bytes in the string you are operating on. A letter is called "directive". Each directive has a different meaning, see below for a complete list of available directives. `C` essentially means: One integer byte value.

A directive can be followed by a number, how often it should be applied. So you could rewrite the above code to:

    "Ruby".unpack("C4")
    # => [82, 117, 98, 121]

You don't need to read the complete string:

    "Ruby".unpack("C2")
    # => [82, 117]

Instead of using a number, it is possible to use `*`, which denotes that the directive should be applied as often as possible:

    "Ruby".unpack("C*")
    # => [82, 117, 98, 121]

Every character that is not a directive, a digit or `*` will be ignored. This is useful to make a pack template more readable, by separating directives with spaces.

What follows is a list of all directives and how to use them.

## Integer Directives

These will all unpack the bytes of a string to an array of integers. One of these integers represents one or more bytes. You have different modes that differ in the number of bytes each integer represents:

Directive    | Size
-------------|-----
`C`          | char
`I!` or `I_` | int
`S!` or `S_` | short
`L!` or `L_` | long
`Q!` or `Q_` | long long
`J!` or `J_` | pointer width

Except for *char* (which is always one byte), it depends on your operating system, how many bytes each of this modes actually reads. So if your operating system defines *short* as 2 bytes, you will get an array that represents every group of two bytes as an integer value:

    "\x01\x00\x02\x00".unpack("S!*") #=> [1, 2]

Or the other way around:

    [1, 2].pack("S!*") # => "\x01\x00\x02\x00"

If you do not want to depend on what byte sizes you operating system defines, you can omit the `!` and it will use a fixed byte size (the exceptions being *int* and *pointer width*, which will always use their native size).

### C | An Unsigned `Integer` per Byte

Range: 0 to 255

    "Idiosyncrätic".unpack("C*")
    # => [73, 100, 105, 111, 115, 121, 110, 99, 114, 195, 164, 116, 105, 99]

    [73, 100, 105, 111, 115, 121, 110, 99, 114, 195, 164, 116, 105, 99].pack("C*")
    # => "Idiosyncr\xC3\xA4tic"

Note that `Array#pack` will not set the string's encoding for you, because it has no way to know.

### c | A Signed `Integer` per Byte

Range: -128 to 127

    "Idiosyncrätic".unpack("c*")
    # => [73, 100, 105, 111, 115, 121, 110, 99, 114, -61, -92, 116, 105, 99]

    [73, 100, 105, 111, 115, 121, 110, 99, 114, -61, -92, 116, 105, 99].pack('c*')
    # => "Idiosyncr\xC3\xA4tic"

### S | An Unsigned `Integer` per 2 Bytes

Range: 0 to 65535

    "Idiosyncrätic".unpack("S*")
    # => [25673, 28521, 31091, 25454, 50034, 29860, 25449]

    [25673, 28521, 31091, 25454, 50034, 29860, 25449].pack("S*")
    # => "Idiosyncr\xC3\xA4tic"

### s | A Signed `Integer` per 2 Bytes

Range: -32768 to 32767

    "Idiosyncrätic".unpack("s*")
    # => [25673, 28521, 31091, 25454, -15502, 29860, 25449]

    [25673, 28521, 31091, 25454, -15502, 29860, 25449].pack("s*")
    # => "Idiosyncr\xC3\xA4tic"

### L | An Unsigned `Integer` per 4 Bytes

Range: 0 to 4294967296

    "Idiosyncrätic".unpack("L*")
    # => [1869177929, 1668184435, 1956954994]

    [1869177929, 1668184435, 1956954994].pack("L*")
    # => "Idiosyncr\xC3\xA4t"

Note: The byte size in this example is 14, which is not dividable by 4, so it will ignore the last 2 bytes. If you need them, you could use a different template like: `"L* C*"`

### l | A Signed `Integer` per 4 Bytes

Range: -2147483648 to 2147483647

    "Idiosyncrätic".unpack("l*")
    # => [1869177929, 1668184435, 1956954994]

    [1869177929, 1668184435, 1956954994].pack("l*")
    # => "Idiosyncr\xC3\xA4t"

### Q | An Unsigned `Integer` per 8 Bytes

Range: 0 to 18446744073709551616

    "Idiosyncrätic".unpack("Q*")
    # => [7164797593890415689]

    [7164797593890415689].pack("Q*")
    # => "Idiosync"

### q | A Signed `Integer` per 8 Bytes

Range: -9223372036854775808 to 9223372036854775807

    "Idiosyncrätic".unpack("q*")
    # => [7164797593890415689]

    [7164797593890415689].pack("q*")
    # => "Idiosync"

### A Note on Byte Order (Big-Endian vs. Little-Endian)

All the previous examples used the native byte order, which means, that the operating system defines, if the more significant bytes come first (little-endian) or last (big-endian). You will find more information about ["endianness" on wikipedia](https://en.wikipedia.org/wiki/Endianness).

If you don't want to rely on your operating system to define byte order, you can add `>` for big-endianness or `<` for little-endianness to your template's directives:

    "\x01\x00\x02\x00".unpack("S<*") #=> [1, 2]
    "\x01\x00\x02\x00".unpack("S>*") #=> [256, 512]

## Integer Shortcut Directives

### n | An Unsigned `Integer` per 2 Bytes, Big-Endian (Similar to `S>`)

Range: 0 to 65535

    "Idiosyncrätic".unpack("n*")
    # => [18788, 26991, 29561, 28259, 29379, 42100, 26979]

    [18788, 26991, 29561, 28259, 29379, 42100, 26979].pack("n*")
    # => "Idiosyncr\xC3\xA4tic"

### N | An Unsigned `Integer` per 4 Bytes, Big-Endian (Similar to `L>`)

Range: 0 to 4294967296

    "Idiosyncrätic".unpack("N*")
    # => [1231317359, 1937337955, 1925424244]

    [1231317359, 1937337955, 1925424244].pack("N*")
    # => "Idiosyncr\xC3\xA4t"

### v | An Unsigned `Integer` per 2 Bytes, Little-Endian (Similar to `S<`)

Range: 0 to 65535

    "Idiosyncrätic".unpack("v*")
    # => [25673, 28521, 31091, 25454, 50034, 29860, 25449]

    [25673, 28521, 31091, 25454, 50034, 29860, 25449].pack("v*")
    # => "Idiosyncr\xC3\xA4tic"

### V | An Unsigned `Integer` per 4 Bytes, Little-Endian (Similar to `L<`)

Range: 0 to 4294967296

    "Idiosyncrätic".unpack("V*")
    # => [1869177929, 1668184435, 1956954994]

    [1869177929, 1668184435, 1956954994].pack("V*")
    # => "Idiosyncr\xC3\xA4t"

## Integer Encoding Directives

### U | UTF-8 Characters

This will convert the string to [unicode code points.](https://en.wikipedia.org/wiki/Code_point). Note that while it throws ArgumentError for [invalid encodings](https://github.com/janlelis/unibits/#utf-8-1), it will happily decode surrogates and too large codepoint values.

    "ɔıʇɐɹɔuʎsoıpı".unpack("U*")
    # => [596, 305, 647, 592, 633, 596, 117, 654, 115, 111, 305, 112, 305]

    [596, 305, 647, 592, 633, 596, 117, 654, 115, 111, 305, 112, 305].pack("U*")
    # => "ɔıʇɐɹɔuʎsoıpı"

### w | BER Compression

See [wikipedia on X.690](https://en.wikipedia.org/wiki/X.690#BER_encoding) for an explanation.

    "Idiosyncrätic".unpack("w*")
    # => [73, 100, 105, 111, 115, 121, 110, 99, 114, 1102452, 105, 99]

    [73, 100, 105, 111, 115, 121, 110, 99, 114, 1102452, 105, 99].pack("w*")
    # => "Idiosyncr\xC3\xA4tic"


## Float Directives

The following directives will interpret bytes as [Floats.](https://en.wikipedia.org/wiki/IEEE_floating_point)

### D, d | A `Float` (Double Precision, Native-Endian)

    [1.2, 3.4].pack("D*")
    # => "333333\xF3?333333\v@"

    "333333\xF3?333333\v@".unpack("D*")
    #=> [1.2, 3.4]

### F | A `Float` (Single Precision, Native-Endian)

    [1.2, 3.4].pack("F*")
    # => "\x9A\x99\x99?\x9A\x99Y@"

    "\x9A\x99\x99?\x9A\x99Y@".unpack("F*")
    # => [1.2000000476837158, 3.4000000953674316]

### E | A `Float` (Double Precision, Little-Endian)

    [1.2, 3.4].pack("E*")
    # => "333333\xF3?333333\v@"

    "333333\xF3?333333\v@".unpack("E*")
    #=> [1.2, 3.4]

### e | A `Float` (Single Precision, Little-Endian)

    [1.2, 3.4].pack("e*")
    # => "\x9A\x99\x99?\x9A\x99Y@"

    "\x9A\x99\x99?\x9A\x99Y@".unpack("e*")
    # => [1.2000000476837158, 3.4000000953674316]

### G | A `Float` (Double Precision, Big-Endian)

    [1.2, 3.4].pack("G*")
    # => "?\xF3333333@\v333333"

    "?\xF3333333@\v333333".unpack("G*")
    #=> [1.2, 3.4]

### g | A `Float` (Single Precision, Big-Endian)

    [1.2, 3.4].pack("g*")
    # => "?\x99\x99\x9A@Y\x99\x9A"

    "\x9A\x99\x99?\x9A\x99Y@".unpack("g*")
    # => [1.2000000476837158, 3.4000000953674316]

## String Directives

String directives are more confusing in the regard that input and output of a `pack` or `unpack` operation are both strings, one of them being wrapped as a single argument in an array. The rule to remember here is that the string representation is something encoded (which might be saved or sent over the wire), while the string-in-an-array format represents the data in a readable format.

### a | Arbitrary String

    "Idiosyncrätic".unpack("a20")
    # => ["Idiosyncr\xC3\xA4tic"]

Fills with null bytes when packing:

    ["Idiosyncrätic"].pack("a20")
    # => "Idiosyncr\xC3\xA4tic\x00\x00\x00\x00\x00\x00"

### A | Arbitrary String (Clean Null Bytes)

Like **a**, but removes trailing spaces and null bytes when unpacking:

    "Idiosyncrätic    \0 ".unpack("A20")
    # => ["Idiosyncr\xC3\xA4tic"]


Like **a**, but replaces null bytes with spaces when packing:

    ["Idiosyncrätic"].pack("A20")
    # => "Idiosyncr\xC3\xA4tic      "

### Z | Null-Terminated String

Like **a**, but unpacking will not read further than null bytes:

    "Idiosyncrätic\0R".unpack("Z20")
    # => ["Idiosyncr\xC3\xA4tic"]

Like **a**, but packing will add a null byte to the end, if used with `*`:

    ["Idiosyncrätic"].pack("Z*")
    # => "Idiosyncr\xC3\xA4tic\x00"

## String Base Conversion Directives

### B | Bit String (Big-Endian)

    "abc".unpack("B*")
    # => ["011000010110001001100011"]

    ["011000010110001001100011"].pack("B*")
    # => "abc"

### b | Bit String (Little-Endian)

    "abc".unpack("b*")
    # => ["100001100100011011000110"]

    ["100001100100011011000110"].pack("b*")
    # => "abc"

### H | Hex String (Big-Endian)

    "xyz".unpack("H*")
    # => ["78797a"]

    ["78797a"].pack("H*")
    # => "xyz"

### h | Hex String (Little-Endian)

    "xyz".unpack("h*")
    # => ["8797a7"]

    ["8797a7"].pack("h*")
    # => "xyz"

## String Encoding Directives

Pack supports a few encoding conversion directives. Note that they are idiosyncratic, since they don't take a count option.

### u | UU-Encoding

[Unix-to-Unix Encoding.](https://en.wikipedia.org/wiki/Uuencoding)

    ["Idiosyncrätic"].pack("u")
    # => ".261I;W-Y;F-RPZ1T:6,`\n"

    ".261I;W-Y;F-RPZ1T:6,`\n".unpack("u")
    # => ["Idiosyncr\xC3\xA4tic"]

### M | Quoted-Printable / MIME Encoding (RFC2045)

[Quoted-Printable.](https://en.wikipedia.org/wiki/Quoted-printable)

    ["Idiosyncrätic"].pack("M")
    # => "Idiosyncr=C3=A4tic=\n"

    "Idiosyncr=C3=A4tic=\n".unpack("M")
    # => ["Idiosyncr\xC3\xA4tic"]

### m | Base64 Encoding (RFC 2045)

[Base64.](https://en.wikipedia.org/wiki/Base64) Ruby's standard library also contains a [Base64 wrapper.](https://github.com/ruby/ruby/blob/trunk/lib/base64.rb#L23)

    ["Idiosyncrätic"].pack("m")
    # => "SWRpb3N5bmNyw6R0aWM=\n"

    "SWRpb3N5bmNyw6R0aWM=\n".unpack("m")
    # => ["Idiosyncr\xC3\xA4tic"]

### m0 | Base64 Encoding (RFC 4648)

[Base64.](https://en.wikipedia.org/wiki/Base64#RFC_4648) This will not add a new-line at the end.

    ["Idiosyncrätic"].pack("m0")
    # => "SWRpb3N5bmNyw6R0aWM="

    "SWRpb3N5bmNyw6R0aWM=".unpack("m0")
    # => ["Idiosyncr\xC3\xA4tic"]

## Pointer Directives

[Pointer](https://en.wikipedia.org/wiki/Pointer_%28computer_programming%29) inspection. If you want to understand how to use these, you should read [pack's source.](https://github.com/ruby/ruby/blob/trunk/pack.c)

### P | Pointer to Fixed-Length String

    ["Idiosyncrätic"].pack('P*')
    # => "\xC0\xDA\x04,.\x7F\x00\x00"

    ["Idiosyncrätic"].pack('P*').unpack("P*")
    # => ["Idiosync"]

### p | Pointer to Null-Terminated String

    ["Idiosyncrätic"].pack('p*')
    # => "\xB8\xF8\x03\x1C.\x7F\x00\x00"

    ["Idiosyncrätic"].pack('p*').unpack("p*")
    # => ["Idiosyncrätic"]

## Positional Directives

You can jump around the current byte position while processing the data. This enables you to read data twice or ignore some data in the middle.

### @ | Go to Position

    "abc".unpack("H* @0B*")
    #=> ["616263", "011000010110001001100011"]

    ["ffffff", "011000010110001001100011"].pack("H* @0B*")
    # => "abc"

*Note:* There was a security issue with this feature where attackers would pass too large numbers to `@`. See the [CVE-2018-8778 announcement](https://www.ruby-lang.org/en/news/2018/03/28/buffer-under-read-unpack-cve-2018-8778/) for more info.

### X | Move a Byte Back

    "Idiosyncrä".unpack("C* X c*")
    # => [73, 100, 105, 111, 115, 121, 110, 99, 114, 195, 164, -92]

    [73, 100, 105, 111, 115, 121, 110, 99, 114, 195, 164, -92].pack("C* X c*")
    # => "Idiosyncr\xC3\xA4"

### x | Skip Byte (Fill with Null Byte when Packing)

    "abc".unpack("C x C")
    # => [97, 99]

    [97, 99].pack("C x C")
    # => "a\x00c"

## New Features in Ruby 2.4

### `String#unpack1`

When you `unpack` something, the resulting object will always be an array. Often, this array consists of only single element, which you are interested in (for example, this is the case for all [String Encoding Directives](#string-directives)). This is why the `unpack1` has been introduced - It will return the first element directly:

    "ℜ".unpack1("U")
    # => 8476

### `buffer:` Option for `Array#pack`

This keyword argument for `Array#pack` lets you use an existing (already allocated) string object as the result object¹²³:

    require "fiddle"

    # Initialize a string we will use later
    a = "Idiosyncrätic Ruby"
    Fiddle::Pointer[a]
    # => #<Fiddle::Pointer:0x00000001e79af0 ptr=0x00000001c3b270
    #      size=18 free=0x00000000000000>

    # Pack something, the normal way
    b = [1,2,3,4].pack("C*")
    # => "\x01\x02\x03\x04"
    Fiddle::Pointer[b]
    # => #<Fiddle::Pointer:0x00000001ef51a0 ptr=0x00000001fc7980
    #      size=4 free=0x00000000000000>

    # Pack something, using an existing buffer
    # It appends the result to the existing string object (same memory address)
    c = [1,2,3,4].pack("C*", buffer: a)
    # => "Idiosyncratic Ruby\u0001\u0002\u0003\u0004"
    Fiddle::Pointer[c]
    # => #<Fiddle::Pointer:0x00000001c314d0 ptr=0x00000001c3b270
    #      size=22 free=0x00000000000000>

    a == c
    # => true


¹ Only if the string's capacity is enough to fit the result<br/>
² You can manually create string buffers of a specific size with another new keyword option:<br/>[`String.new(..., capacity: ...)`](https://ruby-doc.org/core/String.html#method-c-new)<br/>
³ See the [RDoc](https://ruby-doc.org/core/Array.html#method-i-pack) for more info how the buffer argument is handled exactly

## Resources

- [RDoc: String#unpack](https://ruby-doc.org/core/String.html#method-i-unpack)
- [RDoc: Array#pack](https://ruby-doc.org/core/Array.html#method-i-pack)
- [Source: pack.c](https://github.com/ruby/ruby/blob/trunk/pack.c)
- [unpack in Perl](http://www.perlmonks.org/?node_id=224666)

## Also See

- [What the Format?](/49-what-the-format.html)
- [What the Time?](/57-what-the-time.html)
- [What the Regex?](/64-what-the-regex.html)
