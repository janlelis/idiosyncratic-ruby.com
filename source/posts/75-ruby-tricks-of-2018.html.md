---
title: Ruby TRICKS of 2018
date: 2020-08-24
tags: tricks, community, obfuscate, golf
---

Ruby was initially designed to be a successor of the Perl programming language, which also means that it inherited a lot of Perl's expressiveness. To celebrate this, the [TRIC¹ contest](https://github.com/tric/trick2018) was invented:

- Write the most Transcendental, Imbroglio Ruby program!
- Illustrate some of the subtleties (and design issues) of Ruby!
- Show the robustness and portability of Ruby interpreters!
- Stabilize the spec of Ruby by the presence of valuable but unmaintainable code!

The best submissions were awarded at the Japanese **Ruby Kaigi** conference and also [included in the Ruby source](https://github.com/ruby/ruby/tree/master/sample/trick2018), for educational purpose. The winning submissions² of 2018 were:

¹ *Transcendental Ruby Imbroglio Contest*<br/>
² *All code is MIT licensed, Copyright (c) 2018, TRICK Winners and Judges*

## 1st Place (Gold): "Most reserved"

By kinaba ([remarks](https://github.com/tric/trick2018/blob/master/01-kinaba/remarks.markdown))

    alias    BEGIN    for      unless   def      class
    super    true     or       return   defined? next
    break    while    begin    undef    do       end
    rescue   then     retry    else     undef    module
    nil      ensure   case     if       yield    __LINE__
    self     and      redo     elsif    not      __FILE__
    alias    END      in       end      when     __ENCODING__
    end      until    false    end

The above Ruby program does not output anything, but it is 100% valid code. What is noteworthy: It only consists of [reserved keywords](https://ruby-doc.org/core-2.5.0/doc/keywords_rdoc.html) and makes use of all of them!


## 2nd Place (Silver): "Best spiral"

By Yusuke Endoh ([remarks](https://github.com/tric/trick2018/blob/master/02-mame/remarks.markdown))

    '';eval(r=%q(->z{r="'';eval(r=\
    %q(#{r}))[%q`#{z}`]";i=-040;30.
    times{|n|(15+n%2*15-n/2).times{
    r<<r[i+=(1.-n&2)*(32-n%2*31)]}}
    i=r[524,0]=?\0;eval(r[479..-1])
    c['"']}))[%q`GFEDCBA"+"[e\"'"'t
    kE*;;\";"  TRICK2018  ";tb,;{{r
    2E0$ob[us@*0)[90,336])_#i\n}s#i
    0H}>["t]];};o[1,?\n*8];ex"-}eac
    1Hl<1[-1]*2*t=n%2];o[14-n,0)mvk
    8M$<4,?\n];15.times{|n|;o[35ie2
    !Pss.slice!(0,1)+x;sleep(0.0t;0
    'W=%q"<<95<<$s<<95;o=->n,x{n.'1
    ;@[2]}|\e../,%@s="'%trick2018!8
    eval$s=%q_eval($s.gsub!(/#{%@`]

Running the above code returns itself, [it is a quine.](https://en.wikipedia.org/wiki/Quine_(computing)) And on top of that, instead of returning the result line by line, it prints itself using a [spiral animation!](https://showterm.io/75d9ca6ccbda2f65945c4)

## 3rd Place (Bronze): "Best png viewer"

By Tomoya Ishida ([remarks](https://github.com/tric/trick2018/blob/master/03-tompng/remarks.markdown))

    X=[];class String def-@;replace ?-+self end;def-a;X.reject!{|x|x.
    __id__==__id__};a.replace(self+?-+a) end end;at_exit{eval C=(Zlib
    .inflate((X*?-).tr(?-,'').tr('q-z','0-9').to_i(26).digits(0x100).
    pack'C*'))};def method_missing n;(X<<n.to_s)[-1]end;require'zlib'
    fzygtoxyzgntmdmuwvfoffbpmvzojpkhczvjvjdbtscnldwbdoprackddovivvmkz
    ponzmosvtjciwkgaslscxxxwudeesmmqpfhislxuxnnypulxstzgobyaekqqhbjcg
    mvko------------ddkeys----eivhnccaqyiw---bzyccmt-----------ymtnge
    jwhi--------------pjxf------mdarbtumnv---qasda--------------gmwdt
    wrtk---qtpzgnce----fsl-------fkgzgtbpp---gwnm----pxkpqkdiw---owga
    momz---yjjvpnvar---zeo---v-----duvalwu---nsqt---waofemwakivnyqkjd
    fzag---uhvusmkl----kzb---rhc----iutzjr---mqlh---ayijpwativpweaato
    xexs--------------rvgv---pjdz-----lkkg---uiaw---lovitupw-----fwmn
    kfru------------jvjpgv---jskycf----pal---gbuf---hfdnywog-----iuca
    pntn---apmkqroeuzwuwkw---gqnmgof-----b---hlpl---vkkyhfyrqfr--jwrl
    kmdb---dhspujhmtgrkccu---uonfummdt-------rqfw----bpiactehwp--fncq
    yzvz---gdaxebplhfndran---ytfmviryeh------hqwkl---------------nced
    bibu---fnkdthgldhkxxjg---rwnmpudhbqin----gucoyki------------hfura
    cqdgqpyzqfzknvdjoxxhpjulwwyebtocxdrvklbuviwwcatlmdosxfvwntzbijguy
    iglrvvzlxerflupxvsyujfacuwhrvmnecgtewtqkhtdggcltejiyqcluclkycwvzg
    vvxfysvttfbeglvrlngntdngzyhqrmltazwdydxrsvjploembhgxdvfmmhepbschm
    brn--iqrcdb--evv----tqp------lg--uein-wzut--mr------wkh------foqz
    zsf--srjnjp--ampb--pfio--hgtekx--rrr---fwd--jn--xqkezcz--vsb--nya
    khrc--evlr--oioxs--mqce--bqfmag--bwz---xda--qw--jnuzelr--qzi--itx
    mdxd--duso--wxbot--nmon--ugnbdpc--a--c--e--hlg--twxndre--tby--rhg
    evhbn--zb--dtxmiz--dpia------vie--h--i--t--shh------kfn------owna
    ealmt--kb--scxdjy--smvl--dqmgebk--t--s--t--gfd--updcbnc--rh--dwwp
    dvpnxb----wpljjdy--kolc--qflyleok---xkv---usbj--jhrawbn--ewx--bgf
    eaqwrw----ejwxhet--dice--eoczconm---urz---rqyp--hovvvfc--bskj--el
    aocjcts--jtumwxm----mgy------xpaoq-jtwqr-aipay------dhy--iync--hk
    sckddmvuvvuhhqstumaykvczaaujrumqbbqsdvdycplyrlkkojlxnkrhbbrmnjxyf
    cdtcmpfmjvthwkpzucbblttgumomlxnxwjeypfeagaukfzeokzxjebkpigcvlqnso

Requires `gem install chunky_png`. This program converts a PNG image into ASCII art! It will turn [this image](https://raw.githubusercontent.com/tric/trick2018/master/03-tompng/trick.png) into the following text output:

    undef p;X=[];class String def-@;replace ?-+dup end;def-a;X.reject!{|x|x.__id__==__id__};a.replace(self+?-+a) end end;at_exit{eval C=
    (Zlib.inflate (X*?-).tr(?-,'').tr('q-z','0-9').to_i(26).digits(256).pack'C*')};def method_missing n;(X<<n.to_s)[-1]end;require'zlib'
    gmlztzdculbtzgtjfetuh---k--htf----d-----------------------------------------------------g-b-----s--t-g--------jmuwescmgchftikfjafccs
    ivchcveidpvxdabnvwyga-f--v-------xf----------------------------------------------------q-v---l-------q---------liiNeawriayymwooxgxqw
    rfosepqsmojseyezmwbhi--------------ew--------------------------------------------------m---k-r-----------vwu--hiotltdmczwyjmlvbyfqwq
    uvvykqdjednoqgtcmtfbzs---------f----o--------------------------------------------------t--a------m----x---f-----dldzsakyofetfozfpmrq
    geusutariiiNiulkjbwlm-----d------------------------------------------------------------j---------o---------x--j-uitzrgwpupwhvendhyno
    uubvnssiywkklwwdufhhi-rw----k---v-------------------------------------------------------sty-----yg---l---c-v----wkffpskpumolqmkeryzg
    zrxdaiposwybbzgxdnegh-----g-----ma--n---------------------------------------------------------j----n--b-n-------yqavmscswdogpcgopygt
    axiqfswlhzeamvymdnteo---q-q-w--------------------------fhrmj-----------------hkou-----------f-----d----u-o------evcuxxegekfgivzzujan
    nslioftsvqvtkeigvfgwr-------------lyco-----------------igyvg-----------------okuk---------m--b-u--d--y------s---dadjrlykfhtermzfyktu
    btoxzfpPicxxfligbivvf--------h----yrat---------------------------------------vjwd---------------------d-ki--o--tyqosehopkwttigwwfskp
    komzvnyrvkjcjwbmdwdkp----------vxphiNdtawn--xms-saketo--jnld----ezulntdaz----nzna-----vhjwt------h----x--x--o--saxxsrkgktqotaluylbkk
    sclegratyaarmgmepheml----------hwgglhlrfcx--znvmpfsgjx-onhju---gtxsmzqprlt---mjzy---frhdk-------------v---mj----dzjujmbgldfwoybgicwu
    tfhgnhlzxlwtdtkgzlaca-------------gmex------arlm--------rvmh-ajtgf-----pqal--wcux-zatyi-------------------------xnluwybcugjclmablshn
    tnjohqtqzivgmyutrssil-------------lcwq------jrf--------gcaii-maie------------vvnfjfqwo--------------------------filivosyhkxcvuwdibwj
    tyxjiopiFqypvwdzoatuq-------------tdln------cnx---------ffuf-ajvq------------tyyypglpzmj------------------------vtqzwewqdsijrbymvpwn
    niNffphoehukpvvmzvhyd-------------ahqd------nfr---------jeqk--toap-----mxhyg-tedv---otrwy-----------------------mjxnrktackwxwiajdnuc
    kkxhuwbvibpvgvcampadi-------------ebmencqz--obf--------wfprz---qmrotkijiqv---ggfp-----hlzw----------------------kastwdpxiyftmypuxbtu
    xetudmwzpomktgnjkcsyc---------------fwpdx---xb----j-----se-k------tllakc-----gjoo-------we------mic---lktk------ubtnrxvrjzuqlrfrsnmf
    okdvfvcdbdqkckjialskk---------------------------v---u-------l----------------------------------z--q--qfg--------aaliNbxbjjpxebboneye
    kcbkjmdclwnfawtfnwkeq----------------------------------j---y-------------------------------a---jmbyo-sgef--gf---extljbozuoofgyvsilct
    xzoqmsqgzjxxpjqwkjkdd------------------------o--------m-------f---------------------------------n--de-ajz-rzv---fhnpbkrwdxoozpxeaxaf
    mbcwxuiqdwcmadheiykaa-----------------------q-f------l---i---------------------------------r----zf---k--y---fi--dcnycheytylcgnioauee
    yekiNacriqoevtdjerqbp----------------------------w---yy-----my----------------------------ko--mnbpskr--c-----j--ozyqpbfovhbhyoprzgqr
    czwtuopxkdbphocfawvbk--------------------------q-s----j--b---------------------------------hd-xsb----bfiNp--w---fmwuvfambdqvxtzldwmh
    xysnyrseydlkjcwfbsjnr-------------------------d-d-------------------------------------------f-enpss---qllpwr----almsdidvjwoigvldfqoa
    lrpbixjpofxocxlflscpo------------------------------q-fyu--z-------------------------------------kfd-z---n-------bqxurujnxzurrdgcojks
    jetyfdkcekckxbyosbfws-------------wdfhgwuvejjmf-----sxjubpvgcsl-------tnmixpv---------eurabjsdvstfv-------------qcyiqhonwoyixqeonfvp
    mopPhywsozohitutgmmrb------------zxwtxe--riedeo---mspgpnv--pimlh------jhtzajk--------qqovvq---ldbrh-------------xtooxpayonpcvvtmvpra
    vvuyiunpoeagdzqjecsub------------klrw------snrc---rrct------aajom--------nsyk--------peea-------azq-------------iNjefdkfhnagjicqwmsm
    mbwwbfgehhbdmvvlflmee---------------------hkejn---jtbo-------jdtje-------jcei---------afyz-----smtc-------------kksvfjyuaqtohxiohhlz
    dvfmfrzcmnsfruhqgjuxz------------------dfxdnlk----kkra-------xmmtf-------jwkw----------rdoozxtcho---------------bbwwferxwnnmdzcniicv
    mfneisdlyeqwynldjgonj----------------jgrjvc-------uxga-------ghnpr-------sers--------scbknx----gmjo-------------moedtnlbflhtlkjibrqk
    gobwqshnpbdcpjmjaeczr--------------iscsxs---------zfpo-------hhfwy-------qbba-------vhlxc-------ntod------------ndwzdomaptumzejiwqbn
    snucynymvfpnadyqkzfcv-------------ggze------------kuvfs-----zuhod--------mylo-------jhwyp-----z-pywd------------dqfmpnevmtqcikbrilto
    aotyxkipebdkassogpcbl-----------wgackesmvvsrihhd---orzndjndlzpb----------eobf-------kkayixzyotqfafa-w-----------mjjxoomwdglwvccozzut
    rthesuszfwycsqqrtxlot-----------ejcqlhriilqbtrys------lwbkzmvp-----------zzwm-------l--qijwfllndzb-ik-----------mmokqomjepdcotnsiNig
    nloryyoswwdmefywnnuhph------------------------------------------------------r--r-nd-----h--x--------------------hlgzeqqslwxgtjgghquf
    nssngjtiudsrvfuxjzclhjhj----------------------------------------------------------t----------------k-f-mp-------obhyehqebtpjbkeepqzt
    ezogzsimfynqmkteaipejo-g-yser-----------------------------------------------e------h-------------i---y----------qpgcqnltivmmsximbbsy
    wtjjolwyoselcumgklqwpldkl-ulm-m---------------------------------------------------------------q---u-f--l--------buixfiitufktsqdtnrei
    tgrtitcewseetlpeuuujb-osdokjozc------------------------------------------n---d-----f--------g--------q--g-------jyyqtezuzmcxgpcwuwfx
    dpPayqmzxrwhbswwalygfurtkruw-u-k---------------------------------------------d---h------i----------c----i-------ulowcddvjbxthqlxjzbe

Every piece of ASCII art generated also contains the full converter program and can be used to transform another PNG image into ASCII!

## 4th Place: "Best one-liner"

By Colin Fulton ([remarks](https://github.com/tric/trick2018/blob/master/04-colin/remarks.markdown))

    # (c) 2018 Colin Fulton. Available for use under the terms of the MIT License.
    $🚀=0;def 🤔 🏷,🤔=0,&b;puts ' '*$🚀+(🤔 ?"":"🚫 ")+🏷;$🚀+=4;b&.[];$🚀-=4;end

What we have here is essentially a testing framework in 68 characters! It uses a method named `🤔` as its API. To illustrate its usage, here is an example:

    $🚀=0;def 🤔 🏷,🤔=0,&b;puts ' '*$🚀+(🤔 ?"":"🚫 ")+🏷;$🚀+=4;b&.[];$🚀-=4;end

    🤔 "Math" do
      🤔 "Addition" do
        🤔 "One plus one equals two.",
          1+1 == 2
        🤔 "One plus one equals eleven. (This should fail.)",
          1+1 == 11
      end

      🤔 "Subtraction" do
        🤔 "One minus one equals zero.",
          1-1 == 0
        🤔 "Ten minus one equal nine.",
          10-1 == 9
      end
    end

Test output:

    Math
        Addition
            One plus one equals two.
            🚫 One plus one equals eleven. (This should fail.)
        Subtraction
            One minus one equals zero.
            Ten minus one equal nine.


## 5th Place: "Most three-dimensional"

By Tomoya Ishida ([remarks](https://github.com/tric/trick2018/blob/master/05-tompng/remarks.markdown))

                                                        X=[];def self.method_missing n;n.to_s.chars;end
                                                   l=[];def l.-a;X<<a=[nil,*a];a;end;def l.+a;self-a;end
                                               class Array;def-@;[]-self;end;def-a;replace [*self,nil,*a
                                     ]end;alias +@ -@;alias + -;end;def gen3d f;yield;b=['solid obj'];w,
                     h=X[0].size,X.size;X<<[];a=->r,z,dr,dz{;r-=w/2.0;z*=2;r2,z2=r+dr,z+dz*2;if r>0||r2>
                     0;r=[0,r].max;r2=[0,r2].max;16.times{|i|m=Math;p=m::PI/8;;c,s=m.cos(t=i*p),m.sin(t)
                     c2,s2=m.cos(t=(i+1)*p),m.sin(t);t-=p/2;[[0,1,2],[0,2,3]].map{|a|b.push [:facet,'n'+
                   +                 'ormal',dz*m.cos(t),dz*m.sin(t),-dr]*' ','outer loop',a.map{|i|'v'+
                  ++                           "ertex #{[[r*c,r*s,z],[r*c2,r*s2,z],[r2*c2,r2*s2,z2],[r2*
                  +c,                              r2*s,z2]][i]*' '}"},:endloop,:endfacet}}end};(0...h).
                 map{|                                  y|w.times{|x|[X[y-1][x]||a[x,y,1,0],X[y+1][x]||
               a[x+1,y+
              1,-1,0],X[
             y][x-+1]||a[
            x,y+1,0,-1],X[y
           ][x++1]||a[x+1,y,
           0,1]]if X[y][x]}}
           s=[b,'end'+b[0]]*
            $/;File.write(f,
             s);X.replace(
                []);end

    gen3d 'wine_glass.stl' do
      l--ww------------------ww--l
      l--ww------------------ww--l
      l--ww++++++++++++++++++ww--l
      l--ww++++++++++++++++++ww--l
      l--ww++++++++++++++++++ww--l
      l--ww++++++++++++++++++ww--l
      l---ww++++++++++++++++ww---l
      l----www++++++++++++www----l
      l------www++++++++www------l
      l--------wwwwwwwwww--------l
      l-----------wwww-----------l
      l------------ww------------l
      l------------ww------------l
      l------------ww------------l
      l-----------wwww-----------l
      l---------wwwwwwww---------l
      l----wwwwwwwwwwwwwwwwww----l
    end

Running the above Ruby program will create an [STL file](https://en.wikipedia.org/wiki/STL_(file_format)) with a 3D description of a wine glass, which you could actually print out using a 3D printer. [You can find a preview of the result here.](https://raw.githubusercontent.com/tric/trick2018/master/05-tompng/preview_of_output.png) Changing the shape of the glass in the above code will also change the outputted 3D model!

## 6th Place: "Most reversible" *eban award*

By Yusuke Endoh ([remarks](https://github.com/tric/trick2018/blob/master/06-mame/remarks.markdown))

    a,b=:reverse,:itself;b=b
    a=b=:itself;b
     r||=->s,m=a{s.send(m)};a
     puts r[$<.sort_by(&r),b]
     ;r||=->s,m=a{s.send(m)};
      a=b=:reverse;0
      b,a=:reverse,:itself#

This program sorts the file given as an argument. The fun starts, when you apply it on the program itself, because it will generate the following, different program:

      a=b=:reverse;0
      b,a=:reverse,:itself#
     ;r||=->s,m=a{s.send(m)};
     puts r[$<.sort_by(&r),b]
     r||=->s,m=a{s.send(m)};a
    a,b=:reverse,:itself;b=b
    a=b=:itself;b

This generated program is also a sorting-program, but it sorts the given file by *reverse order*. The fun continues when you use the program to reverse-order itself! This is the result:

    a=b=:itself;b
    a,b=:reverse,:itself;b=b
     r||=->s,m=a{s.send(m)};a
     puts r[$<.sort_by(&r),b]
     ;r||=->s,m=a{s.send(m)};
      b,a=:reverse,:itself#
      a=b=:reverse;0

It is even another sorting program, this time it will sort any given file by their last characters on each line. It is a reverse-line sorter! But what if we want to sort by reversed lines in reverse order? No problem, just go one level further and apply the reverse-line sorter program to itself:

      b,a=:reverse,:itself#
      a=b=:reverse;0
     ;r||=->s,m=a{s.send(m)};
     puts r[$<.sort_by(&r),b]
     r||=->s,m=a{s.send(m)};a
    a=b=:itself;b
    a,b=:reverse,:itself;b=b

The fun ends, when you let this sorter sort itself (again!) which produces the original code:

    a,b=:reverse,:itself;b=b
    a=b=:itself;b
     r||=->s,m=a{s.send(m)};a
     puts r[$<.sort_by(&r),b]
     ;r||=->s,m=a{s.send(m)};
      a=b=:reverse;0
      b,a=:reverse,:itself#



## 7th Place: "Best compiler"

By Colin Fulton ([remarks](https://github.com/tric/trick2018/blob/master/07-colin/remarks.markdown))

    $l||=__LINE__;eval q=%q[k =";eval q=%q";
    # (c) 2018 Colin Fulton  (MIT License) #
    ;n=([1]);f=->s{[0]*(s.size/40)};$c||=-17
    $r=[*$r]+[[]]*(($l-$c)/18);$c=$l;(s="");
    ;;m=->a,b{8+4*a[b]};$r[ -1]+=f[s]+n;s=%;
    ;;s&&$r[-1]=f[s]+$r[-1]||(z=44);z=$l=s=z
    (y=->{z=puts(z.map &:rstrip)})&&(s="")&&
    e=->a,b,c{(a+a)[b+c]+a[b-c]};$r||=$r*42;
    ;h=[1,*8..10];f=->a,l{a+[0] *(l-a.size)}
    (r||=->{f[$r.flat_map{|a|f[a,9]},81]})&&
    c=->a,d{h.map{|p|e[a,d,p]}.sum};!nil.!||
    g=->a{d=-1;a. map{(m[a,d+=1])[c[a,d]]}};
    ;x=->{"$l||=__LINE__"+k+91.chr+q+93.chr}
    b=->{x[].split(?\n).map{|s|s[$t]}}||!$$;
    (v=->i{g[r[]][i]>0?b[]: [" "*40]*18}) &&
    w=->i{z ?z.zip(v[i]) .map(&:join):v[i]};
    ;$t=/\S.{0,39}/;u=->i{z=w[i];i%9>7&&y[]}
    ;at_exit{b=b&&($z||81.times(&u)&&$z=1)}]

The above code snippet is meant as a building block to build a pattern for a [Conway's Game of Life](https://github.com/tric/trick2018/blob/master/07-colin/demo.rb) simulation! You have to take this literally and build up the pattern using the above **code block**! Executing the pattern with Ruby will generate the next generation. [Here is the "glider" start pattern](https://raw.githubusercontent.com/tric/trick2018/master/07-colin/demo.rb). Repeat the script multiple times to [see it moving!](https://showterm.io/1a79b93909a07d1273dda) (zoom out for the best viewing experience)

## 8th Place: "Most composable" *shinh award*, *leonid award*

By Tomoya Ishida ([remarks](https://github.com/tric/trick2018/blob/master/08-tompng/remarks.markdown))

<pre><code>












































                   (B||=[])<<6;C||=[];C<<%w@0 if@;
             a=?;*2018;C<<%w@2 (e=ARGV[0]);e=File.read@;
          t=->(i,s){s&&a[i.to_i,s.size]=s};C<<%w@25 (e)if@;
         u=->{C.map{|i,s|t[i,s]};eval(a)};C<<%w@30 (/^\.+$@;
        at_exit{_,u=u,->{};_[]};C<<%w@37 /!~e&&File.exist?(@;
       C<<%w@55 e));d='[><+-,.]';i=32.chr;f=0..79;c=(0..7).m@;
       C<<%w@99 ap{|c|b=['C||=[];','a=?;*2018;','t=->(i,s){s@;
      C<<%w@143 &&a[i.to_i,s.size]=s};','u=->{C.map{|i,s|t[i,@;
      C<<%w@188 s]};eval(a)};','at_exit{_,u=u,->{};_[]};'];o=@;
      C<<%w@233 0;f.map{|f|j=(0..67).map{|r|r-=34;s=f-34;m,n=@;
      C<<%w@278 r.abs,s.abs;h=->x{m<25&&n<34&&(x<0||n>17)};q=@;
      C<<%w@323 ->x{n<x+34&&x<n&&n<34};[h[r],q[-r],q[r],n<11|@;
      C<<%w@368 |(m<17&&n<34),n<12,r**4*1.6+16*(s-25)**4<8*17@;
      C<<%w@413 **4||(s>37&&s>17-r&&4*s<173-r),r**4+16*(s-25)@;
      C<<%w@458 **4<8*17**4,h[-r]][c]};r,p=j.index(!!0),j.cou@;
      C<<%w@503 nt(!!0);next(i*68)if(!r);k=f==45?'(B||=[])<<'@;
      C<<%w@548 +c.to_s+?;:'';g=b[0];(k+=b.shift)if(g&&g.size@;
      C<<%w@593 <=p-k.size);l=p-k.size-o.to_s.size-9;s=64.chr@;
      C<<%w@638 ;if(l>0);k+=['C<<%w',s,o,i,a[o,l],s,?;]*'';o+@;
      C<<%w@683 =l;end;(i*r)+k+?;*([p-k.size,0].max)+i*(68-r-@;
      C<<%w@728 p)}};(e.chars-(e.chars-d.chars)).each_slice(8@;
      C<<%w@773 ){|l|puts(f.map{|y|l.map{|r|c[d.index(r)][y]}@;
       C<<%w@818 .*(i*17).rstrip});4.times{puts};};else;x,i=@;
       C<<%w@861 Hash.new{0},0;y=%(while(x[i]!=0);i+=1;i-=1;@;
        C<<%w@904 x[i]+=1;x[i]-=1;x[i]=($<.binmode.getc||0)@;
         C<<%w@945 .ord;$><<(x[i]&0xff).chr;end).split(?;)@;
          C<<%w@984 ;eval(B.map{|a|y[a]}*?;);end;;;;;;;;;@;
             C<<%w@1021 ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;@;
                   C<<%w@1051 ;;;;;;;;;;;;;;;;;;@;









</code></pre>

This is not just another [brainfuck compiler](https://en.wikipedia.org/wiki/Brainfuck). Not only does this piece of code convert a [bf source file](https://raw.githubusercontent.com/tric/trick2018/master/08-tompng/sample.bf) into an equivalent Ruby source file. It also formats the resulting Ruby code into huge letters representing the original bf code. As a bonus, the compiler gets embedded into the generated Ruby file and is used when it receives another file as a command-line argument. A demo of all the described features in [this short video by the author!](https://raw.githubusercontent.com/tric/trick2018/master/08-tompng/sample.mp4)

## 9th Place: "Most (un)readable"

By Yutaka Hara

    def method_missing(n);$*<<n.to_s.bytesize
    n[-1]=="!" and eval$*.map(&:chr).join;end

    ＊自己言及的なプログラム.
    これは「自己に言及」したQuineプログラムです.
    動かすには普通に無引数で実行してください.
    MRIの最新の安定版で動作確認を行っています.
    ＊冒頭の2行が日本語プログラミングのDSLを提供します.
    Rubyはピリオドまでの部分がメソッド名であると解釈します.
    そのままではNoMethodErrorになります.
    それをmethod_missingを使って検知しメソッド名のbytesizeをASCIIコードとして文字にします.
    メソッド名が半角の！で終わる場合、記憶した文字たちをjoinしてevalします.
    これにより任意のRubyプログラムを日本語により記述することができます.
    このプログラムの場合はこのファイルをreadし出力するようになっています.
    ＊Note：文の長さは注意が必要.
    UTF_8の日本語は1文字が3bytes.
    端数が丁度になるよう英語を入れる.
    以上、自己言及的programでした!

The first two lines of this Ruby script enable a "Japanese programming" style. The characters before each `.` get converted to ASCII on the basis of their byte size. The embedded example program is `$><<IO.read($0)`: The code reads itself to then output itself.

## 10th Place: "Best double meaning" *matz award*

By Tomoya Ishida ([remarks](https://github.com/tric/trick2018/blob/master/10-tompng/remarks.markdown))

    def self.method_missing name, *args
      name.to_s
    end

    FizzMessage = Fizz()
    BuzzMessage = Buzz()

    def    fizzbuzz_loop n=100
      n = n.to_i
      return 0 if n == 0
      (1..n).each do |i|
        puts fizzbuzz(i)
      end
      error = get_error_message
      puts error if error
    end

    def   fizzbuzz n
      set_error 'wrong argument type' if n.nil?
      if n <  0
        n = -n
        retval =  fizzbuzz n
        return       retval
      else
        if mod3(n) == 0 && mod5(n) == 0
          FizzMessage + BuzzMessage
        elsif mod3(n) == 0
          FizzMessage
        elsif mod5(n) == 0
          BuzzMessage
        else
          int2string n
        end
      end
    end

    def        int2string n
      if n <  0
        n = -n
        tmp =    int2string n
        return  '-' + tmp
      end
      base =  10
      charcode_offset =   0x30
      n =     n.to_i unless n.is_a? Integer
      chars = n.digits(      base   ).map do |n|
        (n + charcode_offset).chr
      end
         chars.reverse.join
    end

    def       mod3 n
      if n <  0
        n = -n
        tmp  = mod3 n
        return  -tmp
      end
      return +0 if n % 3 == 0
      return +2 if n % 3 == 2 || n % 3 == -1
      return  +1
    end

    def   mod5 n
      if n <  0
        n = -n
        tmp = mod5 n
        flip =                  -1
        tmp * flip
      else
        n.modulo 5
      end
    end

    def     set_error msg
      if  !msg
        msg = 'UnknownError'
        retval  = set_error msg
        return  retval
      end
      $ERROR =
               msg
    end

    def      get_error_message
      $ERROR
    end





    eval     'n=100;fizzbuzz_loop(n)'

The program printed above is not the original submission, but it looks very similar to the real entry! When run, it will print out the well-known FizzBuzz sequence:

    1
    2
    Fizz
    4
    Buzz
    Fizz
    7
    8
    Fizz
    Buzz
    11
    Fizz
    13
    14
    FizzBuzz
    …

However, the [actual competition entry](https://raw.githubusercontent.com/tric/trick2018/master/10-tompng/entry.rb) will print out:

    1
    2
    Ruby
    4
    Trick
    Ruby
    7
    8
    Ruby
    Trick
    11
    Ruby
    13
    14
    RubyTrick
    …

The difference: A bunch of [invisible Unicode characters](https://character.construction/blanks) sprinkled throughout the code, namely **U+00AB** (no-break space) and **U+200B** (zero width space), which drastically change how the code gets interpreted!

## 11th Place: "Most attractive" *eto award*

By Tomoya Ishida ([remarks](https://github.com/tric/trick2018/blob/master/11-tompng/remarks.markdown))

                               p,i,u,f,v,q    ,h,x=[],
                             Math,->x{i.sin x},->x,y,z{
                           x*=1.2;      r,a,m=(1   -y=y*1.4+0.15)/2+0.1,y+u[3*x+4*y+5*z*=1.2]  /12,x*
                         x+z*z;         l,s,b=     m**0.5,i.atan2(z,x),u[6*a]**2/36+((x*x+z*z)**0.5-r)**
                         2-(1-   a*      a)/2      /500;l-=   (1-y   )/8   *d=  (u[   2*s  +3*3*t   =1-y-
                        l/2]*    u[       3*       s-3*2       *                            t])    **2/(
                         1+i.  exp(       t        *10-   9-  5.5      ));e       =4*l /(   1+(    0.01+
                         (1-a=y-d*    (       1    -y)       /8)**    2)**0.5    -a)*(1-a    *    a+((1-
                          a*a)**2+   0.01   )**    0.5    )** 0.5    ;(i.atan(   (1-0.2*i.         asin(
                          0.98*      u[+   +5.0    *           i.    atan2(y=   3*y-3.4,x         *=3)]
                          ))*(       (0.01+x*x+     y*y      )**    0.5-0.1)    +4*(0.01+z        *z*4
              )**0.5-1)* i.atan(     a*a+e*e-1-10/(1+(40*m)**10+((a+1)*10)**10))-0.01)*b},%w&    MMM##
          TTTQQBKPTVVpQAk5Y7*pgw43v7*pgaor<*"ggau]/~"gau];-~'ga;,,,.'MerryChristmas!&*'',->x    ,y,z,
        s,m{if(m==    1);g=f   [x+=s/2,y+=s/2,z+=s/2];a,  b,c=f[x+d=0.01,y,z]-g,f[x,y+d,z]-    g,f[x,
       y,z+d]           -g;   p<<[x,y,z,a/d=(a*a+b*b+c    *c)**0.5,b/d,c/d];else;(r=0        ...n=[m,4].min).map{|i|r.map{
      |j|a,    b=[f[   x+k    =s*i/n,y+l=s*j/n,z+s],f   [x+k,y+l,z],f[    x,y+k,z+l],f[x+l,y,z+k],f[x+s,y+k,z+l],f[x+l,y++s,
     z+k]].  minmax;return    8.   times    {     |     i|q[x      +          s     *    i     [0],y+s       *i[1]      ,z+s*
    i[2],    s,m/2]}if a*b          <0           &&     s/=    2  }}         ;                 end},         0,1    ..  j=128
    (0..7)   .each{|i|q[i[    0]    -z=      1.0,i[1    ]-z     ,i[2]    -z,z,64]         ;    $><<   v[2   *i+64     ,2]};;;
    sleep    1;loop{  r,s    ,m,    l,d,    w=i.cos(   h+=0.02   ),u[   h],i.cos(  m=    u[    2.3    *h    ]/5),u     [++m],
    x.map    {[7]*j},  x.    map    {[7]    *j};;p.    each{|     x,y    ,z,a,b,   e|    x,    z=x    *r    +s*z,z     *r-s*
    x;y,z     =m*y+   l*z    ,m       *z    -l*y;x,      y=64*    (x+    1  ),64   *(    1-      y     )       ;x<j    &&y<
     j&&z<            d[x    ][     y]&&   (d[x][y]     ,w       [x][      y]=z    ,(    8*     (1           +(      a*r+b+
      e*s)/2)    /2).floor)};32.times{|i|4.times{|x|w[((u[i**3]+u[h/4+i]/4)*j+x[0])%j][(h/2+u[i*i])%1*j+x[1]]=5}};f=[1,1]
          $><<27.chr+   ?[+f*  ';'+?H+(0..63)     .map{|y|x.map{|x|  v[w[x-=1  ][2*y]*8+w[x][2*y+  1]]}.join}*$/}

Run the code next Christmas for [an animated terminal Christmas tree](https://showterm.io/e23f90d1917ee2c0b991a).

## 12th Place: "Minimum alternative of irb" *mame award*

By Jan Lelis ([remarks](https://github.com/tric/trick2018/blob/master/12-jan/remarks.markdown)), **wait, me on that list? Sure, it's no mistake? Unbelievable!**

    eval      %w?_="";_       _=binding;l
    oop(      )do    $><      <">       >\s
    "if       $/>     _;p     uts        "=>
    \s%p      "%[   __.e      val       (_+
    =get      s||exit!)       ,_=""];rescu
    e(Ex      cep   tio       n);       put
    s""+      "\e    [31      m%p        \e[
    0m"%      [$!     ,_=     ""]       if/
    d\se      |ee      /!~    "#$!"end?*""

Run the code above to get a fully functional [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) with multi-line support:

    >> 21 + 21
    => 42

    >> 42.succ
    => 43

    >> def announce
    puts "TRICK 2018"
    end
    => :announce

    >> announce
    TRICK 2018

For a better usage experience, error messages get displayed in red:

<pre>>> 1/0
<span style="color:red">#<ZeroDivisionError: divided by 0></span>
</pre>

## 13th Place: "Most warned" *yhara award*

By kinaba ([remarks](https://github.com/tric/trick2018/blob/master/13-kinaba/remarks.markdown))

    def STDOUT.write (s); syswrite s
     end if def $>.write; end
    s = Array.new(){}.map{|s|}
    s << (-"Trick").grapheme_clusters{}        [0] # frozen_string_literal: Trick
    s << ("Ruby".unpack *"ao")                 [0]
    s << "#{10**2018 + 1e2018}"                [0]
    s << "#{1>2>3 rescue $!.class.trust.class}"[0]
    s << "#{true; Kernel.public_class_method}" [0]
    s << ($ruby.object_id.coerce +2018)        [0]
    result = puts s*""

This program of 10 lines does not output anything special, but as soon you run it with warnings enabled (`ruby -w`), each line generates two warnings (Ruby 2.5), one at compile-time, and another one at runtime!

    kin.rb:1: warning: parentheses after method name is interpreted as an argument list, not a decomposed argument
    kin.rb:2: warning: mismatched indentations at 'end' with 'def' at 1
    kin.rb:3: warning: shadowing outer local variable - s
    kin.rb:4: warning: `frozen_string_literal' is ignored after any tokens
    kin.rb:5: warning: `*' interpreted as argument prefix
    kin.rb:6: warning: Float 1e2018 out of range
    kin.rb:7: warning: comparison '>' after comparison
    kin.rb:8: warning: unused literal ignored
    kin.rb:9: warning: ambiguous first argument; put parentheses or a space even after `+' operator
    kin.rb:10: warning: assigned but unused variable - result
    kin.rb:1: warning: method redefined; discarding old write
    kin.rb:2: warning: previous definition of write was here
    kin.rb:3: warning: given block not used
    kin.rb:4: warning: passing a block to String#grapheme_clusters is deprecated
    kin.rb:4: warning: character class has duplicated range: /\X/
    kin.rb:5: warning: unknown unpack directive 'o' in 'ao'
    kin.rb:6: warning: Bignum out of Float range
    kin.rb:7: warning: trust is deprecated and its behavior is same as untaint
    kin.rb:8: warning: public_class_method with no argument is just ignored
    kin.rb:9: warning: global variable `$ruby' not initialized
    kin.rb:10: warning: #<IO:<STDOUT>>.write is outdated interface which accepts just one argument
    TRICK2018

## Honorable Mentions

- ["Best monkey"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/tompng/entry.rb) by Tomoya Ishida ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/tompng/remarks.markdown))
- ["Best abuse of lambda"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/shinh/entry.rb) by Shinichiro Hamaji ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/shinh/remarks.markdown))
- ["Best abuse of meta"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/yugui/entry.rb) by Yuki Yugui Sonoda ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/yugui/remarks.markdown))
- ["Most solvable"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/omoikane/entry.rb) by Don Yang ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/omoikane/remarks.markdown))
- ["Best layout"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/yhara/entry.rb) by Yutaka Hara ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/yhara/remarks.markdown))
- ["Best abuse of regexp"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/eregon/entry.rb) by Benoit Daloze ([example.json](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/eregon/example.json), [remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/eregon/remarks.markdown))
- ["Most tolerant"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/tamayose/entry.rb) by Shuichi Tamayose ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/tamayose/remarks.markdown))
- ["Best applause"](https://raw.githubusercontent.com/tric/trick2018/master/honorable-mentions/colin/entry.rb) by Colin Fulton ([remarks](https://github.com/tric/trick2018/blob/master/honorable-mentions/colin/remarks.markdown))

## Also See

- [TRIC 2015](/48-ruby-tricks-of-2015.html)
- [TRIC 2013](/47-ruby-tricks-of-2013.html)
