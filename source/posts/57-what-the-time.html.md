---
title: What the Time?
date: 2016-05-26
tags: date, time, cheatsheet, strftime
commit: 77a3e11fccaf1aa2ce7cb55dea992f3ffd1865d3
---

[%a](#a--weekday-name-abbreviated)
[%A](#a--weekday-name)
[%b](#b-h--month-name-abbreviated)
[%B](#b--month-name)
[%c](#c--date-weekday--month--day-of-month--time--year)
[%C](#c--century)
[%d](#d--day-of-month--0131)
[%D](#d-x--date-american)
[%e](#e--day-of-month-space-padded--0131)
[%F](#f--date-iso-8601)
[%g](#g--year-week-based-without-century)
[%G](#g--year-week-based-with-century)
[%h](#b-h--month-name-abbreviated)
[%H](#h--hour-of-day-24h-zero-padded--023)
[%I](#i--hour-of-day-12h-zero-padded--011)
[%j](#j--day-of-year--001366)
[%k](#k--hour-of-day-24h-space-padded--023)
[%l](#l--hour-of-day-12h-space-padded--011)
[%L](#l--millisecond--000999)
[%m](#m--month-as-number)
[%M](#m--minute-of-hour--0059)
[%n](#n--newline)
[%N](#n--fraction-default-nanosecond)
[%p](#p--meridian-indicator-uppercase)
[%P](#p--meridian-indicator-lowercase)
[%Q](#q--milliseconds-since-unix-epoch)
[%r](#r--time-hour--minute--second--daytime)
[%R](#r--time-hour--minute)
[%s](#s--seconds-since-unix-epoch)
[%S](#s--second-of-minute--0060)
[%t](#t--tab)
[%T](#t-x--time-hour--minute--second)
[%u](#u--weekday-as-number-monday-starts-week--17)
[%U](#u--week-number-sunday-starts-week--0053)
[%v](#v--date-vms)
[%V](#v--week-number-week-based-year--0153)
[%w](#w--weekday-as-number-sunday-starts-week--06)
[%W](#w--week-number-monday-starts-weeks--0053)
[%x](#d-x--date-american)
[%X](#t-x--time-hour--minute--second)
[%y](#y--year-without-century)
[%Y](#y--year-with-century)
[%z](#z--time-zone-offset-from-utc)
[%Z](#z--time-zone-abbreviated-os-dependent)
[%+](#date-date1-style)
[%%](#section)
[-](#formatting-flags-and-padding)
[_](#formatting-flags-and-padding)
[0](#formatting-flags-and-padding)
<a href="#formatting-flags-and-padding">^</a>
[#](#formatting-flags-and-padding)
[:](#z--time-zone-offset-from-utc)

Date and time formatting is traditionally done with [strftime](http://pubs.opengroup.org/onlinepubs/9699919799/functions/strftime.html). Not any different in Ruby, which includes a [public domain based strftime implementation](https://github.com/ruby/ruby/blob/trunk/strftime.c) accessible via [Time#strftime](http://ruby-doc.org/core/Time.html#method-i-strftime). Ruby would not be Ruby if it would not add some confusion: There is a [second implementation included in the standard library](https://github.com/ruby/ruby/blob/trunk/ext/date/date_strftime.c) which is used by [Date#strftime](http://ruby-doc.org/stdlib/libdoc/date/rdoc/Date.html#method-i-strftime) and [DateTime#strftime](http://ruby-doc.org/stdlib/libdoc/date/rdoc/DateTime.html#method-i-strftime). It behaves similarly in most cases, but also differs in some nuances (for example, additional formatting directives like `%Q` are supported).

ARTICLE

## Usage

`strftime()` is called on time objects to convert them to strings:

    Time.utc(2016, 05, 24, 15).strftime("%a %b %e %T %Y")
    # => "Tue May 24 15:00:00 2016"

Similar to [format strings](/49-what-the-format.html) or [String.unpack()](/4-what-the-pack.html) you have to pass a template string which contains formatting directives (like `%Y` for year). Many of the directives are combined directives (like `%T` for time), constructed from multiple base directives ("atoms"). The following tables give an overview, scroll further down for an explanation of every directive.

## Atoms

Point of Time | Atoms (Example)
--------------|-----------------
Year          | `%Y` (2016)<br/>`%C` (20)<br/>`%y` (16)
Month         | `%m` (05)
Day           | `%d` (31)<br/>`%j` (365)
Hour/Daytime  | `%H` (23)<br/>`%I` (11)<br/>`%P` (am)
Minute        | `%M` (59)
Second        | `%S` (59)
Fraction      | `%N` (479254327)

### English

Name                 | Atoms (Example)
---------------------|----------------
English Month Name   | `%B` (January)<br/>`%b` (Jan)
English Weekday Name | `%A` (Monday)<br/>`%a` (Mon)

### Week Based

Point of Time | Atoms (Example)
--------------|----------------
Year (by Week)| `%G` (2016)<br/>`%g` (16)
Week          | `%W` (52)<br/>`%U` (52)<br/>`%V` (52)
Weekday       | `%u` (3)<br/>`%w` (3)

### Other

Name           | Atoms (Example)
---------------|----------------
Time Zone      | `%z` (+0000)<br/>`%Z` (UTC)
[Unix Timestamp](https://en.wikipedia.org/wiki/Unix_time) | `%s` (1464188400)
[Unix Timestamp](https://en.wikipedia.org/wiki/Unix_time) (Milliseconds)¹ | `%Q` (1464188400)

¹ Only available in Date/DateTime's strftime() implementation

## Formatting Flags and Padding

Time formatting directives support some basic padding and formatting options via flags that appear between `%` and the directive type. Padding is the minimum length of the output, if the value is smaller, the remaining space will be filled with spaces or zeros.

Flag | Description
-----|------------
`-`  | Do not apply default padding
`_`  | Use spaces for padding
`0`  | Use zeros for padding
`^`  | Upcase
`#`  | Swap case

Examples:

    time = Time.utc(2016, 05, 25, 15) #=> 2016-05-25 15:00:00 UTC

    time.strftime("%P") # => "pm"
    time.strftime("%^P") # => "PM"
    time.strftime("%#P") # => "PM"
    time.strftime("%10P") # =>  "        pm"
    time.strftime("%010P") # => "00000000pm"
    time.strftime("%_10P") # =>  "        pm"

    time.strftime("%m") # => "05"
    time.strftime("%-m") # => "5"
    time.strftime("%10m") #=> "0000000005"
    time.strftime("%010m") #=> "0000000005"
    time.strftime("%_10m") #=> "         5"

## Combined Directives and Aliases

Directive | Alias/From Atoms
----------|-----------------
`%c`      | `%a %b %e %T %Y`
`%D`      | `%m/%d/%y`
`%e`      | `%_d`
`%F`      | `%Y-%m-%d`
`%h`      | `%b`
`%k`      | `%_H`
`%l`      | `%_I`
`%L`      | `%3N`
`%n`      | `"\n"`
`%p`      | `%^P`
`%r`      | `%I:%M:%S %p`
`%R`      | `%H:%M`
`%t`      | `"\t"`
`%T`      | `%H:%M:%S`
`%v`      | Time#strftime: `%e-%^b-%4Y`<br/>Date#strftime: `%e-%b-%4Y`
`%x`      | `%m/%d/%y`
`%X`      | `%H:%M:%S`
`%+`¹     | `%a %b %e %H:%M:%S %Z %Y`

¹ Only available in Date/DateTime's strftime() implementation

## Years Directives

### %Y | Year, with Century

Will display the time's year with a default padding of 4:

    Time.utc(2016).strftime("%Y") # => "2016"
    Time.utc(20000).strftime("%Y") # => "20000"
    Time.utc(2).strftime("%Y") # => "0002"
    Time.utc(2).strftime("%-Y") # => "2"

### %y | Year, without Century

Will display the time's year modulo 100 with a default padding of 2:

    Time.utc(2016).strftime("%y") # => "16"
    Time.utc(20000).strftime("%y") # => "00"
    Time.utc(2).strftime("%y") # => "02"
    Time.utc(2).strftime("%-y") # => "2"

### %C | Century

Will display the time's year divided by 100 with a default padding of 2:

    Time.utc(2016).strftime("%C") # => "20"
    Time.utc(20000).strftime("%C") # => "000"
    Time.utc(2).strftime("%C") # => "00"
    Time.utc(2).strftime("%-C") # => "0"

### %G | Year (Week based), with Century

Returns the year based on [which year the time's week belongs to](https://en.wikipedia.org/wiki/ISO_week_date#First_week):

    Time.utc(2014, 12, 29).strftime("%G") # => "2015"
    Time.utc(2017, 1, 1).strftime("%G") #=> "2016"

### %g | Year (Week based), without Century

Returns the year based on [which year the time's week belongs to](https://en.wikipedia.org/wiki/ISO_week_date#First_week):

    Time.utc(2014, 12, 29).strftime("%g") # => "15"
    Time.utc(2017, 1, 1).strftime("%g") #=> "16"

## Months Directives

### %m | Month as Number

Number of month, with a default padding of 2:

    Time.utc(2016, 5).strftime("%m") # => "05"
    Time.utc(2016, 5).strftime("%-m") # => "5"

### %B | Month Name

Locale-independent (English) month name:

    Time.utc(2016, 1).strftime("%B") # => "January"

### %b, %h | Month Name (Abbreviated)

Locale-independent (English) three-letter month name:

    Time.utc(2016, 1).strftime("%b") # => "Jan"
    Time.utc(2016, 1).strftime("%h") # => "Jan"

## Weeks Directives

See [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date) for an explanation of week number construction.

### %U | Week Number (Sunday Starts Week) | 00..53

Considers Sunday the **first** day of the week. Will return `00` if week belongs to last year:

    Time.utc(2015, 1, 1).strftime("%U") # => "00" # Thursday
    Time.utc(2016, 1, 1).strftime("%U") # => "00" # Friday
    Time.utc(2017, 1, 1).strftime("%U") # => "01" # Sunday

### %V | Week Number (Week Based Year) | 01..53

Considers Sunday the **first** day of the week. Will return last years week number if week belongs to last year:

    Time.utc(2015, 1, 1).strftime("%V") # => "01" # Thursday
    Time.utc(2016, 1, 1).strftime("%V") # => "53" # Friday
    Time.utc(2017, 1, 1).strftime("%V") # => "52" # Sunday

### %W | Week Number (Monday Starts Weeks) | 00..53

Considers Sunday the **last** day of the week. Will return `00` if week belongs to last year:

    Time.utc(2015, 1, 1).strftime("%W") # => "00" # Thursday
    Time.utc(2016, 1, 1).strftime("%W") # => "00" # Friday
    Time.utc(2017, 1, 1).strftime("%W") # => "00" # Sunday

## Days Directives

### %j | Day of Year | 001..366

Which day of the year with a default padding of 3:

    Time.utc(2016, 5, 24).strftime("%j") # => "145"
    Time.utc(2016, 1, 1).strftime("%j") # => "001"
    Time.utc(2016, 1, 1).strftime("%-j") # => "1"

### %d | Day of Month | 01..31

Which day of the month with a default (zero) padding of 2:

    Time.utc(2016, 5, 24).strftime("%d") # => "24"
    Time.utc(2016, 1, 1).strftime("%d") # => "01"
    Time.utc(2016, 1, 1).strftime("%-d") # => "1"

### %e | Day of Month (Space Padded) | 01..31

Which day of the month with a default (space) padding of 2:

    Time.utc(2016, 5, 24).strftime("%e") # => "24"
    Time.utc(2016, 1, 1).strftime("%e") # => " 1"
    Time.utc(2016, 1, 1).strftime("%-e") # => "1"

### %u | Weekday as Number (Monday Starts Week) | 1..7

Number of day in the week, value of Sunday is 7:

    Time.utc(2016, 5, 22).strftime("%u") # => 7 # Sunday
    Time.utc(2016, 5, 23).strftime("%u") # => 1 # Monday
    Time.utc(2016, 5, 24).strftime("%u") # => 2 # Tuesday
    Time.utc(2016, 5, 25).strftime("%u") # => 3 # Wednesday
    Time.utc(2016, 5, 26).strftime("%u") # => 4 # Thursday
    Time.utc(2016, 5, 27).strftime("%u") # => 5 # Friday
    Time.utc(2016, 5, 28).strftime("%u") # => 6 # Saturday

### %w | Weekday as Number (Sunday Starts Week) | 0..6

Number of day in the week, value of Sunday is 0:

    Time.utc(2016, 5, 22).strftime("%u") # => 0 # Sunday
    Time.utc(2016, 5, 23).strftime("%u") # => 1 # Monday
    Time.utc(2016, 5, 24).strftime("%u") # => 2 # Tuesday
    Time.utc(2016, 5, 25).strftime("%u") # => 3 # Wednesday
    Time.utc(2016, 5, 26).strftime("%u") # => 4 # Thursday
    Time.utc(2016, 5, 27).strftime("%u") # => 5 # Friday
    Time.utc(2016, 5, 28).strftime("%u") # => 6 # Saturday

### %A | Weekday Name

Locale-independent (English) name of weekday:

    Time.utc(2016, 5, 22).strftime("%A") # => "Sunday"
    Time.utc(2016, 5, 23).strftime("%A") # => "Monday"
    Time.utc(2016, 5, 24).strftime("%A") # => "Tuesday"
    Time.utc(2016, 5, 25).strftime("%A") # => "Wednesday"
    Time.utc(2016, 5, 26).strftime("%A") # => "Thursday"
    Time.utc(2016, 5, 27).strftime("%A") # => "Friday"
    Time.utc(2016, 5, 28).strftime("%A") # => "Saturday"

### %a | Weekday Name (Abbreviated)

Locale-independent (English) three-letter name of weekday:

    Time.utc(2016, 5, 22).strftime("%a") # => "Sun"
    Time.utc(2016, 5, 23).strftime("%a") # => "Mon"
    Time.utc(2016, 5, 24).strftime("%a") # => "Tue"
    Time.utc(2016, 5, 25).strftime("%a") # => "Wed"
    Time.utc(2016, 5, 26).strftime("%a") # => "Thu"
    Time.utc(2016, 5, 27).strftime("%a") # => "Fri"
    Time.utc(2016, 5, 28).strftime("%a") # => "Sat"

### %D, %x | Date, American

`%m/%d/%y`

- Month
- Day of Month
- Year without Century

<pre><code>Time.utc(2016, 5, 24).strftime("%D") # => "05/24/16"
Time.utc(2016, 5, 24).strftime("%x") # => "05/24/16"</code></pre>

### %F | Date, ISO 8601

`%Y-%m-%d`

- Year
- Month
- Day of Month

<pre><code>Time.utc(2016, 5, 24).strftime("%F") # => "2016-05-24"</code></pre>

### %v | Date, VMS

#### With Time#strftime

`%_d-%^b-%Y`

- Space Padded Day of Month
- Uppercased Month Name
- Year

<pre><code>Time.utc(2016, 5, 24).strftime("%v") # => "24-MAY-2016"</code></pre>

#### With Date#strftime and DateTime#strftime

`%_d-%b-%Y`

- Space Padded Day of Month
- Month Name
- Year

<pre><code>require "date"
Time.utc(2016, 5, 24).to_date.strftime("%v") # => "24-May-2016"</code></pre>

## Daytime Directives

### %P | Meridian Indicator (Lowercase)

Returns "am" for hours between 0 and 11, returns "pm" for hours between 12 and 23:

    Time.utc(2016, 5, 24, 15).strftime("%P") # => "pm"
    Time.utc(2016, 5, 24, 3).strftime("%P") # => "am"

### %p | Meridian Indicator (Uppercase)

Returns "AM" for hours between 0 and 11, returns "PM" for hours between 12 and 23:

    Time.utc(2016, 5, 24, 15).strftime("%p") # => "PM"
    Time.utc(2016, 5, 24, 3).strftime("%p") # => "AM"

## Hours Directives

### %H | Hour of Day, 24h (Zero Padded) | 0..23

Time's hour on the 24h clock:

    Time.utc(2016, 5, 24, 15).strftime("%H") # => "15"
    Time.utc(2016, 5, 24, 3).strftime("%H") # => "03"
    Time.utc(2016, 5, 24, 3).strftime("%-H") # => "3"

### %k | Hour of Day, 24h (Space Padded) | 0..23

Time's hour on the 24h clock:

    Time.utc(2016, 5, 24, 15).strftime("%k") # => "15"
    Time.utc(2016, 5, 24, 3).strftime("%k") # => " 3"
    Time.utc(2016, 5, 24, 3).strftime("%-k") # => "3"

### %I | Hour of Day, 12h (Zero Padded) | 0..11

Time's hour on the 12h clock:

    Time.utc(2016, 5, 24, 15).strftime("%I") # => "03"
    Time.utc(2016, 5, 24, 3).strftime("%I") # => "03"
    Time.utc(2016, 5, 24, 3).strftime("%-I") # => "3"

### %l | Hour of Day, 12h (Space Padded) | 0..11

Time's hour on the 12h clock:

    Time.utc(2016, 5, 24, 15).strftime("%l") # => " 3"
    Time.utc(2016, 5, 24, 3).strftime("%l") # => " 3"
    Time.utc(2016, 5, 24, 3).strftime("%-l") # => "3"

## Minutes Directives

### %M | Minute of Hour | 00..59

Time's minutes with default padding of 2:

    Time.utc(2016, 5, 24, 15, 29).strftime("%M") # => "29"
    Time.utc(2016, 5, 24, 15, 1).strftime("%M") # => "01"
    Time.utc(2016, 5, 24, 15, 1).strftime("%-M") # => "1"

### %R | Time, Hour + Minute

`%H:%M`

- Hour (24h)
- Minute

<pre><code>Time.utc(2016, 5, 24, 15, 29).strftime("%R") # => "15:29"</code></pre>

## Seconds Directives

### %S | Second of Minute | 00..60

Time's seconds with default padding of 2:

    Time.utc(2016, 5, 24, 15, 29, 59).strftime("%S") # => "59"
    Time.utc(2016, 5, 24, 15, 29, 1).strftime("%S") # => "01"
    Time.utc(2016, 5, 24, 15, 29, 1).strftime("%-S") # => "1"

### %s | Seconds Since Unix Epoch

Number of seconds since **1970-01-01 00:00:00 UTC**. This known as [Unix timestamps](https://en.wikipedia.org/wiki/Unix_time). It returns the same value (as string) like [Time#to_i](http://ruby-doc.org/core/Time.html#method-i-to_i):

    Time.utc(2016, 5, 24, 15, 29, 59).strftime("%s") # => "1464103799"
    Time.utc(2016, 5, 24, 15, 29, 59).to_i # => 1464103799

### %r | Time, Hour + Minute + Second + Daytime

`%I:%M:%S %p`

- Hour (12h)
- Minute
- Second
- Daytime

<pre><code>Time.utc(2016, 5, 24, 15, 29, 59).strftime("%r") # => "03:29:59 PM"</code></pre>

### %T, %X | Time, Hour + Minute + Second

`%H:%M:%S`

- Hour (24h)
- Minute
- Second

<pre><code>Time.utc(2016, 5, 24, 15, 29, 59).strftime("%T") # => "15:29:59"
Time.utc(2016, 5, 24, 15, 29, 59).strftime("%X") # => "15:29:59"
</code></pre>

### %c | Date, Weekday + Month + Day of Month + Time + Year

`%a %b %e %T %Y`

- Weekday (Short)
- Month (Short)
- Day of Month 
- Time (24h)
- Year

<pre><code>Time.utc(2016, 5, 24, 15, 29, 59).strftime("%c") # => "Tue May 24 15:29:59 2016"</code></pre>

### %+ | Date, `date(1)` Style

*Only available in Date/DateTime's strftime() implementation*

`%a %b %e %T %Z %Y`

- Weekday (Short)
- Month (Short)
- Day of Month
- Time (24h)
- Numerical Time Zone Offset
- Year

<pre><code>require "date"
Time.utc(2016, 5, 24, 15, 29, 59).to_datetime.strftime("%+")
# => "Tue May 24 15:29:59 +00:00 2016"
</code></pre>

## Smaller Than Seconds Directives

### %L | Millisecond | 000..999

Millisecond with default padding of 3. More precise fractions will be truncated:

    Time.utc(2016, 5, 24, 15, 29, 0.1239).strftime("%L") # => "123"

### %N | Fraction, Default: Nanosecond

Specifies time fractions like milliseconds (precision of 3), microseconds (precision of 6), or nanoseconds (precision of 9). More precise fractions will be truncated. Cannot be combined with padding:

    Time.utc(2016, 5, 24, 15, 29, 0.1234567890).strftime("%3N") # => "123"
    Time.utc(2016, 5, 24, 15, 29, 0.1234567890).strftime("%6N") # => "123456"
    Time.utc(2016, 5, 24, 15, 29, 0.1234567890).strftime("%9N") # => "123456789"
    Time.utc(2016, 5, 24, 15, 29, 0.1234567890).strftime("%N") # => "123456789"

### %Q | Milliseconds Since Unix Epoch

*Only available in Date/DateTime's strftime() implementation*

Number of milliseconds since **1970-01-01 00:00:00 UTC**:

    require "date"
    Time.utc(2016, 5, 24, 15, 29, 59.012).to_datetime.strftime("%Q") #=> "1464103799012"

## Time Zone Directives

### %z | Time Zone, Offset from UTC

A numerical [time zone](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets) identifier in the format of

- Sign
- Two-digit Hour
- Two-digit Minute

which describes the offset from  [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time):

    Time.utc(2016, 5, 24).strftime("%z") # => "+0000"
    Time.local(2016, 5, 24).strftime("%z") # => "+0200"

The output separates hours and minutes when using a single `:` flag:

    Time.local(2016, 5, 24).strftime("%:z") # => "+02:00"

It will also show the seconds offset when using two `::` colons:

    Time.local(2016, 5, 24).strftime("%::z") # => "+02:00:00"

When using `:::`, it will only return significant information (no zero minutes or seconds):

    Time.local(2016, 5, 24).strftime("%:::z") # => "+02"

### %Z | Time Zone, Abbreviated, OS Dependent

#### With Time#strftime

Big `%Z` displays a platform dependent time zone string:

    Time.utc(2016, 5, 24).strftime("%Z") # => "UTC"
    Time.local(2016, 5, 24).strftime("%Z") # => "CEST"

Ruby's documentation disencourages `%Z`, because it has a different result on different platforms and also does not properly identify the time zone:

<blockquote>
<p><em>While all directives are locale independent since Ruby 1.9, <code>%Z</code> is platform dependent. So, the result may differ even if the same format string is used in other systems such as C.</em></p>
<p><em><code>%z</code> is recommended over <code>%Z</code>. <code>%Z</code> doesn’t identify the timezone. For example, "CST" is used at America/Chicago (-06:00), America/Havana (-05:00), Asia/Harbin (+08:00), Australia/Darwin (+09:30) and Australia/Adelaide (+10:30). Also, <code>%Z</code> is highly dependent on the operating system. For example, it may generate a non ASCII string on Japanese Windows. i.e. the result can be different to "JST". So the numeric time zone offset, <code>%z</code>, is recommended.</em></p>
</blockquote>

#### With Date#strftime and DateTime#strftime

Date's strftime() implementation outputs a numerical offset, similar to `%:z`:

    require "date"
    Time.utc(2016, 5, 24).to_datetime.strftime("%Z") # => "+00:00"
    Time.local(2016, 5, 24).to_datetime.strftime("%Z") # => "+02:00"

## Non Interpolating Directives

### %n | Newline

Output a newline:

    Time.utc(2016).strftime("%n") # => "\n"

### %t | Tab

Output a tab:

    Time.utc(2016).strftime("%t") # => "\t"

### %% | %

A single `%` needs to be escaped:

    Time.utc(2016).strftime("%%") # => "%"

## Resources

- [RDoc: Time#strftime](http://ruby-doc.org/core/Kernel.html#method-i-sprintf)
- [RDoc: Date#strftime](http://ruby-doc.org/stdlib/libdoc/date/rdoc/Date.html#method-i-strftime)
- [Source: strftime.c](https://github.com/ruby/ruby/blob/trunk/strftime.c)
- [Source: date_strftime.c](https://github.com/ruby/ruby/blob/trunk/ext/date/date_strftime.c)

## Also See

- [What the Pack?](/4-what-the-pack.html)
- [What the Format?](/49-what-the-format.html)
