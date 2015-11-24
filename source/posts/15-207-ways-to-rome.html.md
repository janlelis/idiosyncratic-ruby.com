---
title: 207 Ways to Rome
date: 2015-05-15
tags: syntax, strings
commit: dbb043e5ff98ddb776048d6f8c41aa1afc84422b
---

All Ruby syntaxes¹ that represent the **R** string literal:

ARTICLE

## (1) Double Quoted Literal

<code>"R"</code>

## (1) Single Quoted Literal

<code>'R'</code>

## (1) Single Char Literals

<code>?R</code>

## (6) Heredocs

<pre><code>&lt;&lt;"STRING"
R
STRING</code></pre>

<pre><code>&lt;&lt;'STRING'
R
STRING</code></pre>

<pre><code>&lt;&lt;STRING
R
STRING</code></pre>

<pre><code>&lt;&lt;-"STRING"
R
STRING</code></pre>

<pre><code>&lt;&lt;-'STRING'
R
STRING</code></pre>

<pre><code>&lt;&lt;-STRING
R
STRING</code></pre>

## (66) Percent Syntax / Q

<code>%Q\0R\0</code>
<code>%Q\x01R\x01</code>
<code>%Q\x02R\x02</code>
<code>%Q\x03R\x03</code>
<code>%Q\x04R\x04</code>
<code>%Q\x05R\x05</code>
<code>%Q\x06R\x06</code>
<code>%Q\aR\a</code>
<code>%Q\bR\b</code>
<code>%Q\tR\t</code>
<code>%Q\nR\n</code>
<code>%Q\vR\v</code>
<code>%Q\fR\f</code>
<code>%Q\rR\r</code>
<code>%Q\x0ER\x0E</code>
<code>%Q\x0FR\x0F</code>
<code>%Q\x10R\x10</code>
<code>%Q\x11R\x11</code>
<code>%Q\x12R\x12</code>
<code>%Q\x13R\x13</code>
<code>%Q\x14R\x14</code>
<code>%Q\x15R\x15</code>
<code>%Q\x16R\x16</code>
<code>%Q\x17R\x17</code>
<code>%Q\x18R\x18</code>
<code>%Q\x19R\x19</code>
<code>%Q\x1AR\x1A</code>
<code>%Q\eR\e</code>
<code>%Q\x1CR\x1C</code>
<code>%Q\x1DR\x1D</code>
<code>%Q\x1ER\x1E</code>
<code>%Q\x1FR\x1F</code>
<code>%Q&nbsp;R&nbsp;</code>
<code>%Q!R!</code>
<code>%Q"R"</code>
<code>%Q#R#</code>
<code>%Q$R$</code>
<code>%Q%R%</code>
<code>%Q&amp;R&amp;</code>
<code>%Q'R'</code>
<code>%Q(R)</code>
<code>%Q)R)</code>
<code>%Q*R*</code>
<code>%Q+R+</code>
<code>%Q,R,</code>
<code>%Q-R-</code>
<code>%Q.R.</code>
<code>%Q/R/</code>
<code>%Q:R:</code>
<code>%Q;R;</code>
<code>%Q&lt;R&gt;</code>
<code>%Q=R=</code>
<code>%Q&gt;R&gt;</code>
<code>%Q?R?</code>
<code>%Q@R@</code>
<code>%Q[R]</code>
<code>%Q\\R\\</code>
<code>%Q]R]</code>
<code>%Q^R^</code>
<code>%Q_R_</code>
<code>%Q`R`</code>
<code>%Q{R}</code>
<code>%Q|R|</code>
<code>%Q}R}</code>
<code>%Q~R~</code>
<code>%Q\x7FR\x7F</code>

## (66) Percent Syntax / q

<code>%q\0R\0</code>
<code>%q\x01R\x01</code>
<code>%q\x02R\x02</code>
<code>%q\x03R\x03</code>
<code>%q\x04R\x04</code>
<code>%q\x05R\x05</code>
<code>%q\x06R\x06</code>
<code>%q\aR\a</code>
<code>%q\bR\b</code>
<code>%q\tR\t</code>
<code>%q\nR\n</code>
<code>%q\vR\v</code>
<code>%q\fR\f</code>
<code>%q\rR\r</code>
<code>%q\x0ER\x0E</code>
<code>%q\x0FR\x0F</code>
<code>%q\x10R\x10</code>
<code>%q\x11R\x11</code>
<code>%q\x12R\x12</code>
<code>%q\x13R\x13</code>
<code>%q\x14R\x14</code>
<code>%q\x15R\x15</code>
<code>%q\x16R\x16</code>
<code>%q\x17R\x17</code>
<code>%q\x18R\x18</code>
<code>%q\x19R\x19</code>
<code>%q\x1AR\x1A</code>
<code>%q\eR\e</code>
<code>%q\x1CR\x1C</code>
<code>%q\x1DR\x1D</code>
<code>%q\x1ER\x1E</code>
<code>%q\x1FR\x1F</code>
<code>%q&nbsp;R&nbsp;</code>
<code>%q!R!</code>
<code>%q"R"</code>
<code>%q#R#</code>
<code>%q$R$</code>
<code>%q%R%</code>
<code>%q&amp;R&amp;</code>
<code>%q'R'</code>
<code>%q(R)</code>
<code>%q)R)</code>
<code>%q*R*</code>
<code>%q+R+</code>
<code>%q,R,</code>
<code>%q-R-</code>
<code>%q.R.</code>
<code>%q/R/</code>
<code>%q:R:</code>
<code>%q;R;</code>
<code>%q&lt;R&gt;</code>
<code>%q=R=</code>
<code>%q&gt;R&gt;</code>
<code>%q?R?</code>
<code>%q@R@</code>
<code>%q[R]</code>
<code>%q\\R\\</code>
<code>%q]R]</code>
<code>%q^R^</code>
<code>%q_R_</code>
<code>%q`R`</code>
<code>%q{R}</code>
<code>%q|R|</code>
<code>%q}R}</code>
<code>%q~R~</code>
<code>%q\x7FR\x7F</code>

## (66) Percent Syntax / None

<code>%\0R\0</code>
<code>%\x01R\x01</code>
<code>%\x02R\x02</code>
<code>%\x03R\x03</code>
<code>%\x04R\x04</code>
<code>%\x05R\x05</code>
<code>%\x06R\x06</code>
<code>%\aR\a</code>
<code>%\bR\b</code>
<code>%\tR\t</code>
<code>%\nR\n</code>
<code>%\vR\v</code>
<code>%\fR\f</code>
<code>%\rR\r</code>
<code>%\x0ER\x0E</code>
<code>%\x0FR\x0F</code>
<code>%\x10R\x10</code>
<code>%\x11R\x11</code>
<code>%\x12R\x12</code>
<code>%\x13R\x13</code>
<code>%\x14R\x14</code>
<code>%\x15R\x15</code>
<code>%\x16R\x16</code>
<code>%\x17R\x17</code>
<code>%\x18R\x18</code>
<code>%\x19R\x19</code>
<code>%\x1AR\x1A</code>
<code>%\eR\e</code>
<code>%\x1CR\x1C</code>
<code>%\x1DR\x1D</code>
<code>%\x1ER\x1E</code>
<code>%\x1FR\x1F</code>
<code>%&nbsp;R&nbsp;</code>
<code>%!R!</code>
<code>%"R"</code>
<code>%#R#</code>
<code>%$R$</code>
<code>%%R%</code>
<code>%&amp;R&amp;</code>
<code>%'R'</code>
<code>%(R)</code>
<code>%)R)</code>
<code>%*R*</code>
<code>%+R+</code>
<code>%,R,</code>
<code>%-R-</code>
<code>%.R.</code>
<code>%/R/</code>
<code>%:R:</code>
<code>%;R;</code>
<code>%&lt;R&gt;</code>
<code>%=R=</code>
<code>%&gt;R&gt;</code>
<code>%?R?</code>
<code>%@R@</code>
<code>%[R]</code>
<code>%\\R\\</code>
<code>%]R]</code>
<code>%^R^</code>
<code>%_R_</code>
<code>%`R`</code>
<code>%{R}</code>
<code>%|R|</code>
<code>%}R}</code>
<code>%~R~</code>
<code>%\x7FR\x7F</code>

<br>

¹ You might need a [hex editor](https://en.wikipedia.org/wiki/Hex_editor), or [`eval`](http://ruby-doc.org/core-2.3.0/Kernel.html#method-i-eval), to be able to use non-printable string delimiters.

## Resources

- [String Literals](http://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Literals#Strings)
