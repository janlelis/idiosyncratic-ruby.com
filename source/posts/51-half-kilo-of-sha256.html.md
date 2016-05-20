---
title: "½ Kilo of SHA256"
date: 2016-05-20
tags: golf
commit: 7aacbecb0d33b51fd4c82779e0e6f4f71c2d8593
---

How many bytes (= ASCII characters) of Ruby code does it take to generate a [SHA 256](https://en.wikipedia.org/wiki/SHA-2#Pseudocode) hash sum of STDIN?

ARTICLE

## 499 Bytes¹

    q,z=[3,2].map{|t|i=l=1;(2..330).select{i-1<(l*=i)%i+=1}.map{|e|(e**t**-1*X=2**32).to_i&X-=1}}
    s=proc{|n,*m|a=0
    m.map{|e|a^=n>>e|n<<32-e}
    a}
    i=$<.read.b<<128
    (i+"\0"*(56-(w=i.size)%64)+[~-w*8].pack('Q>')).gsub(/.{64}/m){w=$&.unpack'N*'
    y=z
    64.times{|i|i>15&&w[i]=w[i-16]+(s[v=w[i-15],7,18]^v>>3)+w[i-7]+(s[w[i-2],17,19]^w[i-2]>>10)&X
    f=y[7]+s[u=y[4],6,11,25]+(u&y[5]^~u&y[6])+q[i]+w[i]
    y=[f+s[y[0],2,13,22]+(y[0]&y[1]^y[0]&y[2]^y[1]&y[2])&X]+y
    y[4]=y[4]+f&X}
    z=z.zip(y).map{|a,b|a+b&X}}
    $><<'%.8x'*8%z

This is based on a submission to a (now defunct) code golf contest and there were "better" submissions, so it is possible to get the code smaller. Looking for pull requests!

¹ The code above actually contains 500 bytes, but you can replace `"\0"` with a real null byte

### Test Script

Save the above code as `sha256.rb` and create the following test script in the same directory:

    # encoding: utf-8

    require "digest/sha2"
    require "open3"

    TEST_SCRIPT = "ruby sha256.rb"
    TEST_CASES  = [
      "Idiosyncrätic Ruby",
      "\n",
      "",
      "a"*6000
    ]

    TEST_CASES.each{ |test_case|
      expected = Digest::SHA256.hexdigest(test_case)
      actual = nil
      Open3.popen3(TEST_SCRIPT){ |in_, out,|
        in_ << test_case
        in_.close
        actual = out.read
      }
      if expected == actual
        print "."
      else
        $stderr.puts "Fail:
    - Expected: #{expected.inspect}
    - Actual:   #{actual.inspect}
    "
      end
    }

## Also See

- [Golfing Basics](/27-golfing-basics.html)
- [Anarchy Golf](http://golf.shinh.org/)
