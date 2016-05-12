---
title: New Ruby Startup
date: 2016-05-12
tags: core
---

What happens when you invoke the Ruby interpreter, even before it executes your first line of code? Actually a lot! A few observations:

ARTICLE

## Initial Load Path

These are all locations you can [Kernel#require](http://ruby-doc.org/core-2.3.1/Kernel.html#method-i-require) from:

    $ ruby --disable-all -e 'puts $LOAD_PATH.map{ |path| "- #{path}" }'

- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/site_ruby/2.3.0
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/site_ruby/2.3.0/x86_64-linux
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/site_ruby
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/vendor_ruby/2.3.0
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/vendor_ruby/2.3.0/x86_64-linux
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/vendor_ruby
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/x86_64-linux

## Initial Loaded Features

These are core libraries that will always get loaded by Ruby:

    $ ruby --disable-all -e 'puts $LOADED_FEATURES.map{ |lib| "- #{lib} "}'

- enumerator.so 
- thread.rb 
- rational.so 
- complex.so 
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/x86_64-linux/enc/encdb.so 
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/x86_64-linux/enc/trans/transdb.so 
- /home/jan/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/unicode_normalize.rb

## Initial Memory Consumption

[Measured with Ruby 2.3.1 on an ubuntu machine:](http://stackoverflow.com/questions/7220896/get-current-ruby-process-memory-usage)

    $ ruby --disable-all -e'puts"%.2f MB".%`ps -o rss -p#$$$$`.strip.split.last.to_f/1024'

<!--- It's $$, not $$$$, markdown seems to be buggy here -->

**6.00 MB**

## Initial Ruby Objects

Via: [ObjectSpace.each_object](http://ruby-doc.org/core-2.3.0/ObjectSpace.html#method-c-each_object)

    $ ruby --disable-all -e 'puts \
    " Ruby Object                   | Count\n" +
    "-------------------------------|------\n" +
    ObjectSpace.each_object.group_by(&:class).map{|k,v| [k, v.size]}.
    sort_by(&:last).reverse.map{|k,v| "#{k.to_s.rjust(30)} | #{v}" }.
    join("\n")'

 Ruby Object                   | Count
-------------------------------|------
                        String | 4085
                         Class | 255
                      Encoding | 101
                        Module | 19
                         Array | 7
                        Symbol | 6
   RubyVM::InstructionSequence | 6
                          Hash | 6
                         Float | 4
                            IO | 3
                        Object | 2
                        Bignum | 2
                   RubyVM::Env | 2
                          Data | 1
                         fatal | 1
                    ARGF.class | 1
                        Random | 1
              SystemStackError | 1
                 NoMemoryError | 1
                        RubyVM | 1
                        Thread | 1
                       Binding | 1
                       IOError | 1
                   ThreadGroup | 1
                       Complex | 1
                 Thread::Mutex | 1
                          File | 1
                    Enumerator | 1

Not listed in this table are "immediate" objects that are directly embedded in Ruby's underlying object system, for example, [small integers](http://ruby-doc.org/core-2.3.1/Fixnum.html).

### Initial Numbers

Some interesting *magic numbers*:

    $ ruby --disable-all -e 'puts ObjectSpace.each_object(Numeric).
    map{ |n| "- #{n} (#{n.class})" }'

- 0+1i (Complex)
- 18446744073709551615 (Bignum)
- 201718672430487408241010011445167668095 (Bignum)
- NaN (Float)
- Infinity (Float)
- 1.7976931348623157e+308 (Float)
- 2.2250738585072014e-308 (Float)

## Initial Internal Objects

Via: [ObjectSpace.count_objects](http://ruby-doc.org/core-2.3.0/ObjectSpace.html#method-c-count_objects)

    $ ruby --disable-all -e 'puts \
    " Object    | Count\n" +
    "-----------|------\n" +
    ObjectSpace.count_objects.to_a.sort_by(&:last).
    reverse.map{|k,v| "#{k.to_s.rjust(10)} | #{v}" }.
    join("\n")'

 Object    | Count
-----------|------
     TOTAL | 9783
  T_STRING | 4369
   T_IMEMO | 2202
      FREE | 2189
   T_CLASS | 490
    T_NODE | 208
    T_DATA | 128
   T_ARRAY | 119
  T_ICLASS | 24
  T_MODULE | 19
    T_HASH | 12
  T_SYMBOL | 6
  T_OBJECT | 6
    T_FILE | 4
   T_FLOAT | 4
  T_BIGNUM | 2
 T_COMPLEX | 1

## Initial Symbols

Via: [Symbol.all_symbols](http://ruby-doc.org/core-2.3.1/Symbol.html#method-c-all_symbols)

Related: [Grammar rules for symbols](/40-symbolic-validations.html)

    $ ruby --disable-all -e 'puts Symbol.all_symbols.sort.
    map{ |s| "`#{s.inspect.sub("`", "\\`")}`" }.join(", ")'

`:""`, `:!`, `:!=`, `:!~`, `:"\""`, `:"#"`, `:"\#$!"`, `:"$"`, `:$!`, `:$"`, `:$$`, `:$&`, `:$'`, `:$*`, `:$+`, `:$,`, `:$-0`, `:$-F`, `:$-I`, `:$-K`, `:$-W`, `:$-a`, `:$-d`, `:$-i`, `:$-l`, `:$-p`, `:$-v`, `:$-w`, `:$.`, `:$/`, `:$0`, `:$:`, `:$;`, `:$<`, `:$=`, `:$>`, `:$?`, `:$@`, `:$DEBUG`, `:$FILENAME`, `:$KCODE`, `:$LOADED_FEATURES`, `:$LOAD_PATH`, `:$PROGRAM_NAME`, `:$SAFE`, `:$VERBOSE`, `:$\`, `:$_`, `:$:$`, `:$stderr`, `:$stdin`, `:$stdout`, `:$~`, `:%`, `:&`, `:"&&"`, `:"&."`, `:"'"`, `:"("`, `:")"`, `:*`, `:**`, `:+`, `:+@`, `:","`, `:-`, `:-@`, `:"."`, `:".."`, `:"..."`, `:/`, `:":"`, `:"::"`, `:";"`, `:<`, `:<<`, `:<=`, `:<=>`, `:"<CFUNC>"`, `:"<IFUNC>"`, `:"="`, `:==`, `:===`, `:=~`, `:>`, `:>=`, `:>>`, `:"?"`, `:"@"`, `:@denominator`, `:@gem_prelude_index`, `:@image`, `:@numerator`, `:@path`, `:@real`, `:AFTER_OUTPUT`, `:ALT_SEPARATOR`, `:ANSI_X3_4_1968`, `:APPEND`, `:ARGF`, `:ARGV`, `:ASCII`, `:ASCII_8BIT`, `:ArgumentError`, `:Array`, `:BIG5`, `:BIG5_HKSCS`, `:BIG5_HKSCS_2008`, `:BIG5_UAO`, `:BINARY`, `:Backtrace`, `:BasicObject`, `:Big5`, `:Big5_HKSCS`, `:Big5_HKSCS_2008`, `:Big5_UAO`, `:Bignum`, `:Binding`, `:CLOCK_BASED_CLOCK_PROCESS_CPUTIME_ID`, `:CLOCK_BOOTTIME`, `:CLOCK_BOOTTIME_ALARM`, `:CLOCK_MONOTONIC`, `:CLOCK_MONOTONIC_COARSE`, `:CLOCK_MONOTONIC_RAW`, `:CLOCK_PROCESS_CPUTIME_ID`, `:CLOCK_REALTIME`, `:CLOCK_REALTIME_ALARM`, `:CLOCK_REALTIME_COARSE`, `:CLOCK_THREAD_CPUTIME_ID`, `:CP1250`, `:CP1251`, `:CP1252`, `:CP1253`, `:CP1254`, `:CP1255`, `:CP1256`, `:CP1257`, `:CP1258`, `:CP437`, `:CP50220`, `:CP50221`, `:CP51932`, `:CP65000`, `:CP65001`, `:CP737`, `:CP775`, `:CP850`, `:CP852`, `:CP855`, `:CP857`, `:CP860`, `:CP861`, `:CP862`, `:CP863`, `:CP864`, `:CP865`, `:CP866`, `:CP869`, `:CP874`, `:CP878`, `:CP932`, `:CP936`, `:CP949`, `:CP950`, `:CP951`, `:CREAT`, `:CRLF_NEWLINE_DECORATOR`, `:CR_NEWLINE_DECORATOR`, `:CSWINDOWS31J`, `:CUR`, `:Class`, `:ClosedQueueError`, `:Comparable`, `:CompatibilityError`, `:Complex`, `:ConditionVariable`, `:Constants`, `:Converter`, `:ConverterNotFoundError`, `:CsWindows31J`, `:DATA`, `:DEFAULT`, `:DEFAULT_PARAMS`, `:DIG`, `:DIRECT`, `:DSYNC`, `:Data`, `:Default`, `:DidYouMean`, `:Dir`, `:DomainError`, `:E`, `:E2BIG`, `:EACCES`, `:EADDRINUSE`, `:EADDRNOTAVAIL`, `:EADV`, `:EAFNOSUPPORT`, `:EAGAIN`, `:EAGAINWaitReadable`, `:EAGAINWaitWritable`, `:EALREADY`, `:EAUTH`, `:EBADE`, `:EBADF`, `:EBADFD`, `:EBADMSG`, `:EBADR`, `:EBADRPC`, `:EBADRQC`, `:EBADSLT`, `:EBCDIC_CP_US`, `:EBFONT`, `:EBUSY`, `:ECANCELED`, `:ECAPMODE`, `:ECHILD`, `:ECHRNG`, `:ECOMM`, `:ECONNABORTED`, `:ECONNREFUSED`, `:ECONNRESET`, `:EDEADLK`, `:EDEADLOCK`, `:EDESTADDRREQ`, `:EDOM`, `:EDOOFUS`, `:EDOTDOT`, `:EDQUOT`, `:EEXIST`, `:EFAULT`, `:EFBIG`, `:EFTYPE`, `:EHOSTDOWN`, `:EHOSTUNREACH`, `:EHWPOISON`, `:EIDRM`, `:EILSEQ`, `:EINPROGRESS`, `:EINPROGRESSWaitReadable`, `:EINPROGRESSWaitWritable`, `:EINTR`, `:EINVAL`, `:EIO`, `:EIPSEC`, `:EISCONN`, `:EISDIR`, `:EISNAM`, `:EKEYEXPIRED`, `:EKEYREJECTED`, `:EKEYREVOKED`, `:EL2HLT`, `:EL2NSYNC`, `:EL3HLT`, `:EL3RST`, `:ELIBACC`, `:ELIBBAD`, `:ELIBEXEC`, `:ELIBMAX`, `:ELIBSCN`, `:ELNRNG`, `:ELOOP`, `:EMACS_MULE`, `:EMEDIUMTYPE`, `:EMFILE`, `:EMLINK`, `:EMSGSIZE`, `:EMULTIHOP`, `:ENAMETOOLONG`, `:ENAVAIL`, `:END`, `:ENEEDAUTH`, `:ENETDOWN`, `:ENETRESET`, `:ENETUNREACH`, `:ENFILE`, `:ENOANO`, `:ENOATTR`, `:ENOBUFS`, `:ENOCSI`, `:ENODATA`, `:ENODEV`, `:ENOENT`, `:ENOEXEC`, `:ENOKEY`, `:ENOLCK`, `:ENOLINK`, `:ENOMEDIUM`, `:ENOMEM`, `:ENOMSG`, `:ENONET`, `:ENOPKG`, `:ENOPROTOOPT`, `:ENOSPC`, `:ENOSR`, `:ENOSTR`, `:ENOSYS`, `:ENOTBLK`, `:ENOTCAPABLE`, `:ENOTCONN`, `:ENOTDIR`, `:ENOTEMPTY`, `:ENOTNAM`, `:ENOTRECOVERABLE`, `:ENOTSOCK`, `:ENOTSUP`, `:ENOTTY`, `:ENOTUNIQ`, `:ENV`, `:ENXIO`, `:EOFError`, `:EOPNOTSUPP`, `:EOVERFLOW`, `:EOWNERDEAD`, `:EPERM`, `:EPFNOSUPPORT`, `:EPIPE`, `:EPROCLIM`, `:EPROCUNAVAIL`, `:EPROGMISMATCH`, `:EPROGUNAVAIL`, `:EPROTO`, `:EPROTONOSUPPORT`, `:EPROTOTYPE`, `:EPSILON`, `:ERANGE`, `:EREMCHG`, `:EREMOTE`, `:EREMOTEIO`, `:ERESTART`, `:ERFKILL`, `:EROFS`, `:ERPCMISMATCH`, `:ESHUTDOWN`, `:ESOCKTNOSUPPORT`, `:ESPIPE`, `:ESRCH`, `:ESRMNT`, `:ESTALE`, `:ESTRPIPE`, `:ETIME`, `:ETIMEDOUT`, `:ETOOMANYREFS`, `:ETXTBSY`, `:EUCCN`, `:EUCJP`, `:EUCJP_MS`, `:EUCKR`, `:EUCLEAN`, `:EUCTW`, `:EUC_CN`, `:EUC_JISX0213`, `:EUC_JIS_2004`, `:EUC_JP`, `:EUC_JP_MS`, `:EUC_KR`, `:EUC_TW`, `:EUNATCH`, `:EUSERS`, `:EWOULDBLOCK`, `:EWOULDBLOCKWaitReadable`, `:EWOULDBLOCKWaitWritable`, `:EXCL`, `:EXDEV`, `:EXFULL`, `:EXTENDED`, `:Emacs_Mule`, `:Encoding`, `:EncodingError`, `:Enumerable`, `:Enumerator`, `:Env`, `:Errno`, `:EucCN`, `:EucJP`, `:EucJP_ms`, `:EucKR`, `:EucTW`, `:Exception`, `:FALSE`, `:FIXEDENCODING`, `:FNM_CASEFOLD`, `:FNM_DOTMATCH`, `:FNM_EXTGLOB`, `:FNM_NOESCAPE`, `:FNM_PATHNAME`, `:FNM_SHORTNAME`, `:FNM_SYSCASE`, `:FalseClass`, `:Fiber`, `:FiberError`, `:File`, `:FileTest`, `:Fixnum`, `:Float`, `:FloatDomainError`, `:Formatter`, `:GB12345`, `:GB18030`, `:GB1988`, `:GB2312`, `:GBK`, `:GC`, `:GETRUSAGE_BASED_CLOCK_PROCESS_CPUTIME_ID`, `:GETTIMEOFDAY_BASED_CLOCK_REALTIME`, `:GID`, `:GMP_VERSION`, `:Gem`, `:Generator`, `:HEAP_BITMAP_PLANES`, `:HEAP_BITMAP_SIZE`, `:HEAP_OBJ_LIMIT`, `:HOLE`, `:Hash`, `:I`, `:IBM037`, `:IBM437`, `:IBM737`, `:IBM775`, `:IBM850`, `:IBM852`, `:IBM855`, `:IBM857`, `:IBM860`, `:IBM861`, `:IBM862`, `:IBM863`, `:IBM864`, `:IBM865`, `:IBM866`, `:IBM869`, `:IGNORECASE`, `:INFINITY`, `:INSTRUCTION_NAMES`, `:INTERNAL_CONSTANTS`, `:INVALID_MASK`, `:INVALID_REPLACE`, `:IO`, `:IOError`, `:ISO2022_JP`, `:ISO2022_JP2`, `:ISO8859_1`, `:ISO8859_10`, `:ISO8859_11`, `:ISO8859_13`, `:ISO8859_14`, `:ISO8859_15`, `:ISO8859_16`, `:ISO8859_2`, `:ISO8859_3`, `:ISO8859_4`, `:ISO8859_5`, `:ISO8859_6`, `:ISO8859_7`, `:ISO8859_8`, `:ISO8859_9`, `:ISO_2022_JP`, `:ISO_2022_JP_2`, `:ISO_2022_JP_KDDI`, `:ISO_8859_1`, `:ISO_8859_10`, `:ISO_8859_11`, `:ISO_8859_13`, `:ISO_8859_14`, `:ISO_8859_15`, `:ISO_8859_16`, `:ISO_8859_2`, `:ISO_8859_3`, `:ISO_8859_4`, `:ISO_8859_5`, `:ISO_8859_6`, `:ISO_8859_7`, `:ISO_8859_8`, `:ISO_8859_9`, `:IndexError`, `:InstructionSequence`, `:Integer`, `:Interrupt`, `:InvalidByteSequenceError`, `:KOI8_R`, `:KOI8_U`, `:Kernel`, `:KeyError`, `:LOCK_EX`, `:LOCK_NB`, `:LOCK_SH`, `:LOCK_UN`, `:Lazy`, `:LoadError`, `:LocalJumpError`, `:Location`, `:MACCENTEURO`, `:MACCROATIAN`, `:MACCYRILLIC`, `:MACGREEK`, `:MACICELAND`, `:MACJAPAN`, `:MACJAPANESE`, `:MACROMAN`, `:MACROMANIA`, `:MACTHAI`, `:MACTURKISH`, `:MACUKRAINE`, `:MAJOR_VERSION`, `:MANT_DIG`, `:MAX`, `:MAX_10_EXP`, `:MAX_EXP`, `:MIN`, `:MINOR_VERSION`, `:MIN_10_EXP`, `:MIN_EXP`, `:MULTILINE`, `:MUTEX_FOR_THREAD_EXCLUSIVE`, `:MacCentEuro`, `:MacCroatian`, `:MacCyrillic`, `:MacGreek`, `:MacIceland`, `:MacJapan`, `:MacJapanese`, `:MacRoman`, `:MacRomania`, `:MacThai`, `:MacTurkish`, `:MacUkraine`, `:Marshal`, `:MatchData`, `:Math`, `:Method`, `:Module`, `:Mutex`, `:NAN`, `:NIL`, `:NOATIME`, `:NOCTTY`, `:NOENCODING`, `:NOERROR`, `:NOFOLLOW`, `:NONBLOCK`, `:NULL`, `:NameError`, `:NilClass`, `:NoMemoryError`, `:NoMethodError`, `:NotImplementedError`, `:Numeric`, `:OPTS`, `:Object`, `:ObjectSpace`, `:PARTIAL_INPUT`, `:PATH_SEPARATOR`, `:PCK`, `:PI`, `:PRIO_PGRP`, `:PRIO_PROCESS`, `:PRIO_USER`, `:Proc`, `:Process`, `:Profiler`, `:Queue`, `:RADIX`, `:RDONLY`, `:RDWR`, `:RLIMIT_AS`, `:RLIMIT_CORE`, `:RLIMIT_CPU`, `:RLIMIT_DATA`, `:RLIMIT_FSIZE`, `:RLIMIT_MEMLOCK`, `:RLIMIT_MSGQUEUE`, `:RLIMIT_NICE`, `:RLIMIT_NOFILE`, `:RLIMIT_NPROC`, `:RLIMIT_RSS`, `:RLIMIT_RTPRIO`, `:RLIMIT_RTTIME`, `:RLIMIT_SIGPENDING`, `:RLIMIT_STACK`, `:RLIM_INFINITY`, `:RLIM_SAVED_CUR`, `:RLIM_SAVED_MAX`, `:ROUNDS`, `:RSYNC`, `:RUBY_COPYRIGHT`, `:RUBY_DESCRIPTION`, `:RUBY_ENGINE`, `:RUBY_ENGINE_VERSION`, `:RUBY_PATCHLEVEL`, `:RUBY_PLATFORM`, `:RUBY_RELEASE_DATE`, `:RUBY_REVISION`, `:RUBY_VERSION`, `:RVALUE_SIZE`, `:Random`, `:Range`, `:RangeError`, `:Rational`, `:Regexp`, `:RegexpError`, `:RubyVM`, `:RuntimeError`, `:SCRIPT_LINES__`, `:SEEK_CUR`, `:SEEK_DATA`, `:SEEK_END`, `:SEEK_HOLE`, `:SEEK_SET`, `:SEPARATOR`, `:SET`, `:SHARE_DELETE`, `:SHIFT_JIS`, `:SJIS`, `:SJIS_DOCOMO`, `:SJIS_DoCoMo`, `:SJIS_KDDI`, `:SJIS_SOFTBANK`, `:SJIS_SoftBank`, `:STATELESS_ISO_2022_JP`, `:STATELESS_ISO_2022_JP_KDDI`, `:STDERR`, `:STDIN`, `:STDOUT`, `:SYNC`, `:ScriptError`, `:SecurityError`, `:Separator`, `:Shift_JIS`, `:Signal`, `:SignalException`, `:SizedQueue`, `:StandardError`, `:Stat`, `:Stateless_ISO_2022_JP`, `:Stateless_ISO_2022_JP_KDDI`, `:Status`, `:StopIteration`, `:String`, `:Struct`, `:Symbol`, `:SyntaxError`, `:Sys`, `:SystemCallError`, `:SystemExit`, `:SystemStackError`, `:TIMES_BASED_CLOCK_MONOTONIC`, `:TIMES_BASED_CLOCK_PROCESS_CPUTIME_ID`, `:TIME_BASED_CLOCK_REALTIME`, `:TIS_620`, `:TMPFILE`, `:TMP_RUBY_PREFIX`, `:TOPLEVEL_BINDING`, `:TRUE`, `:TRUNC`, `:Thread`, `:ThreadError`, `:ThreadGroup`, `:Time`, `:Tms`, `:TracePoint`, `:TrueClass`, `:TypeError`, `:UCS_2BE`, `:UCS_4BE`, `:UCS_4LE`, `:UID`, `:UNDEF_HEX_CHARREF`, `:UNDEF_MASK`, `:UNDEF_REPLACE`, `:UNIVERSAL_NEWLINE_DECORATOR`, `:US_ASCII`, `:UTF8_DOCOMO`, `:UTF8_DoCoMo`, `:UTF8_KDDI`, `:UTF8_MAC`, `:UTF8_SOFTBANK`, `:UTF8_SoftBank`, `:UTF_16`, `:UTF_16BE`, `:UTF_16LE`, `:UTF_32`, `:UTF_32BE`, `:UTF_32LE`, `:UTF_7`, `:UTF_8`, `:UTF_8_HFS`, `:UTF_8_MAC`, `:UnboundMethod`, `:UncaughtThrowError`, `:UndefinedConversionError`, `:UnicodeNormalize`, `:WINDOWS_1250`, `:WINDOWS_1251`, `:WINDOWS_1252`, `:WINDOWS_1253`, `:WINDOWS_1254`, `:WINDOWS_1255`, `:WINDOWS_1256`, `:WINDOWS_1257`, `:WINDOWS_1258`, `:WINDOWS_31J`, `:WINDOWS_874`, `:WNOHANG`, `:WRONLY`, `:WUNTRACED`, `:WaitReadable`, `:WaitWritable`, `:Waiter`, `:WeakMap`, `:Windows_1250`, `:Windows_1251`, `:Windows_1252`, `:Windows_1253`, `:Windows_1254`, `:Windows_1255`, `:Windows_1256`, `:Windows_1257`, `:Windows_1258`, `:Windows_31J`, `:Windows_874`, `:XML_ATTR_CONTENT_DECORATOR`, `:XML_ATTR_QUOTE_DECORATOR`, `:XML_TEXT_DECORATOR`, `:Yielder`, `:ZeroDivisionError`, `:"["`, `:[]`, `:[]=`, `:"\\"`, `:"]"`, `:^`, `:_`, `:__attached__`, `:__autoload__`, `:__callee__`, `:__classid__`, `:__classpath__`, `:__dir__`, `:__id__`, `:__members__`, `:__members_back__`, `:__method__`, `:__read_nonblock`, `:__recursive_key__`, `:__send__`, `:__tmp_classpath__`, `:__write_nonblock`, `:_alloc`, `:_dump`, `:_dump_data`, `:_id2ref`, `:_load`, `:_load_data`, `::`, `:abort`, `:abort_on_exception`, `:abort_on_exception=`, `:abs`, `:abs2`, `:absolute_path`, `:acos`, `:acosh`, `:add`, `:add_trace_func`, `:advise`, `:after_output`, `:alias_method`, `:aliases`, `:alive?`, `:all?`, `:all_symbols`, `:allocate`, `:ancestors`, `:angle`, `:any?`, `:append_features`, `:arg`, `:args`, `:arguments`, `:argv`, `:argv0`, `:arity`, `:ascii_compatible?`, `:ascii_only?`, `:asciicompat_encoding`, `:asctime`, `:asin`, `:asinh`, `:assoc`, `:at`, `:at_exit`, `:atan`, `:atan2`, `:atanh`, `:atime`, `:attr`, `:attr_accessor`, `:attr_reader`, `:attr_writer`, `:autoclose`, `:autoclose=`, `:autoclose?`, `:autoload`, `:autoload?`, `:b`, `:backtrace`, `:backtrace_locations`, `:base_label`, `:basename`, `:begin`, `:between?`, `:bind`, `:binding`, `:binmode`, `:binmode?`, `:binread`, `:binwrite`, `:birthtime`, `:bit_length`, `:blksize`, `:block_given?`, `:blockdev?`, `:blocks`, `:broadcast`, `:bsearch`, `:bsearch_index`, `:bt`, `:bt_locations`, `:buf`, `:by`, `:bytes`, `:bytesize`, `:byteslice`, `:call`, `:caller`, `:caller_locations`, `:capitalize`, `:capitalize!`, `:captures`, `:casecmp`, `:casefold?`, `:catch`, `:cause`, `:cbrt`, `:ceil`, `:center`, `:change_privilege`, `:chardev?`, `:chars`, `:chdir`, `:child`, `:chmod`, `:chomp`, `:chomp!`, `:chop`, `:chop!`, `:chown`, `:chr`, `:chroot`, `:chunk`, `:chunk_while`, `:class`, `:class_eval`, `:class_exec`, `:class_variable_defined?`, `:class_variable_get`, `:class_variable_set`, `:class_variables`, `:clear`, `:clock_getres`, `:clock_gettime`, `:clone`, `:close`, `:close_on_exec=`, `:close_on_exec?`, `:close_others`, `:close_read`, `:close_write`, `:closed?`, `:codepoints`, `:coerce`, `:collect`, `:collect!`, `:collect_concat`, `:combination`, `:compact`, `:compact!`, `:compare_by_identity`, `:compare_by_identity?`, `:compatible`, `:compatible?`, `:compile`, `:compile_file`, `:compile_option`, `:compile_option=`, `:concat`, `:conj`, `:conjugate`, `:const_defined?`, `:const_get`, `:const_missing`, `:const_set`, `:constants`, `:convert`, `:convpath`, `:copy_stream`, `:"core#define_method"`, `:"core#define_singleton_method"`, `:"core#hash_from_ary"`, `:"core#hash_merge_ary"`, `:"core#hash_merge_kwd"`, `:"core#hash_merge_ptr"`, `:"core#set_method_alias"`, `:"core#set_postexe"`, `:"core#set_variable_alias"`, `:"core#undef_method"`, `:coredump?`, `:cos`, `:cosh`, `:count`, `:count_objects`, `:cover?`, `:cr`, `:cr_newline`, `:crlf`, `:crlf_newline`, `:crypt`, `:cstime`, `:cstime=`, `:ctime`, `:current`, `:curry`, `:cutime`, `:cutime=`, `:cycle`, `:daemon`, `:day`, `:debug_frozen_string_literal`, `:debug_level`, `:default`, `:default=`, `:default_external`, `:default_external=`, `:default_internal`, `:default_internal=`, `:default_proc`, `:default_proc=`, `:define_finalizer`, `:define_method`, `:define_singleton_method`, `:defined_class`, `:delete`, `:delete!`, `:delete_at`, `:delete_if`, `:denominator`, `:deprecate_constant`, `:deq`, `:destination_buffer_full`, `:destination_encoding`, `:destination_encoding_name`, `:detach`, `:detect`, `:dev`, `:dev_major`, `:dev_minor`, `:dig`, `:directory?`, `:dirname`, `:disable`, `:disasm`, `:disassemble`, `:display`, `:div`, `:divmod`, `:dontneed`, `:downcase`, `:downcase!`, `:downto`, `:drop`, `:drop_while`, `:dst?`, `:dummy?`, `:dump`, `:dup`, `:each`, `:each_byte`, `:each_char`, `:each_codepoint`, `:each_cons`, `:each_entry`, `:each_index`, `:each_key`, `:each_line`, `:each_object`, `:each_pair`, `:each_slice`, `:each_value`, `:each_with_index`, `:each_with_object`, `:egid`, `:egid=`, `:eid`, `:eid=`, `:empty?`, `:enable`, `:enabled?`, `:enclose`, `:enclosed?`, `:encode`, `:encode!`, `:encoding`, `:end`, `:end_with?`, `:enq`, `:entries`, `:enum_for`, `:eof`, `:eof?`, `:eql?`, `:equal?`, `:erf`, `:erfc`, `:err`, `:errno`, `:error_bytes`, `:error_char`, `:escape`, `:euid`, `:euid=`, `:eval`, `:even?`, `:event`, `:exception`, `:excl`, `:exclude_end?`, `:exclusive`, `:exec`, `:executable?`, `:executable_real?`, `:exist?`, `:exists?`, `:exit`, `:exit!`, `:exit_value`, `:exited?`, `:exitstatus`, `:exp`, `:expand_path`, `:extend`, `:extend_object`, `:extended`, `:external_encoding`, `:extname`, `:fail`, `:fallback`, `:fatal`, `:fcntl`, `:fdatasync`, `:fdiv`, `:feed`, `:fetch`, `:fetch_values`, `:fiber_machine_stack_size`, `:fiber_vm_stack_size`, `:file`, `:file?`, `:filename`, `:fileno`, `:fill`, `:finalize`, `:find`, `:find_all`, `:find_index`, `:finish`, `:finished`, `:finite?`, `:first`, `:first_lineno`, `:fixed_encoding?`, `:flags`, `:flat_map`, `:flatten`, `:flatten!`, `:float_microsecond`, `:float_millisecond`, `:float_second`, `:flock`, `:floor`, `:flush`, `:fnmatch`, `:fnmatch?`, `:for_fd`, `:force`, `:force_encoding`, `:foreach`, `:fork`, `:form`, `:format`, `:freeze`, `:frexp`, `:friday?`, `:from_name`, `:frozen?`, `:frozen_string_literal`, `:fsync`, `:ftype`, `:gamma`, `:garbage_collect`, `:gcd`, `:gcdlcm`, `:getbyte`, `:getc`, `:getegid`, `:geteuid`, `:getgid`, `:getgm`, `:getlocal`, `:getpgid`, `:getpgrp`, `:getpriority`, `:getrlimit`, `:gets`, `:getsid`, `:getuid`, `:getutc`, `:getwd`, `:gid`, `:gid=`, `:glob`, `:global_variables`, `:gm`, `:gmt?`, `:gmt_offset`, `:gmtime`, `:gmtoff`, `:grant_privilege`, `:grep`, `:grep_v`, `:group`, `:group_by`, `:groups`, `:groups=`, `:grpowned?`, `:gsub`, `:gsub!`, `:handle_interrupt`, `:has_key?`, `:has_value?`, `:hash`, `:hertz`, `:hex`, `:home`, `:hour`, `:hypot`, `:i`, `:id2name`, `:identical?`, `:imag`, `:imaginary`, `:immediate`, `:in`, `:include`, `:include?`, `:included`, `:included_modules`, `:incomplete_input`, `:incomplete_input?`, `:index`, `:infinite?`, `:inherited`, `:initgroups`, `:initialize`, `:initialize_clone`, `:initialize_copy`, `:initialize_dup`, `:inject`, `:inline_const_cache`, `:ino`, `:inplace_mode`, `:inplace_mode=`, `:insert`, `:insert_output`, `:inspect`, `:instance_eval`, `:instance_exec`, `:instance_method`, `:instance_methods`, `:instance_of?`, `:instance_variable_defined?`, `:instance_variable_get`, `:instance_variable_set`, `:instance_variables`, `:instructions_unification`, `:integer?`, `:intern`, `:internal_encoding`, `:invalid`, `:invalid_byte_sequence`, `:invert`, `:ioctl`, `:is_a?`, `:isatty`, `:isdst`, `:issetugid`, `:iterator?`, `:itself`, `:join`, `:keep_if`, `:key`, `:key?`, `:keys`, `:kill`, `:kind_of?`, `:label`, `:lambda`, `:lambda?`, `:last`, `:last_error`, `:last_match`, `:latest_gc_info`, `:lazy`, `:lchmod`, `:lchown`, `:lcm`, `:ldexp`, `:left`, `:len`, `:length`, `:lf`, `:lgamma`, `:lineno`, `:lineno=`, `:lines`, `:link`, `:list`, `:ljust`, `:load`, `:load_from_binary`, `:load_from_binary_extra_data`, `:load_iseq`, `:local`, `:local_variable_defined?`, `:local_variable_get`, `:local_variable_set`, `:local_variables`, `:locale_charmap`, `:locals`, `:localtime`, `:lock`, `:locked?`, `:log`, `:log10`, `:log2`, `:loop`, `:lstat`, `:lstrip`, `:lstrip!`, `:magnitude`, `:main`, `:map`, `:map!`, `:marshal_dump`, `:marshal_load`, `:match`, `:max`, `:max=`, `:max_by`, `:maxgroups`, `:maxgroups=`, `:mday`, `:member?`, `:members`, `:memo`, `:merge`, `:merge!`, `:mesg`, `:message`, `:method`, `:method_added`, `:method_defined?`, `:method_id`, `:method_missing`, `:method_removed`, `:method_undefined`, `:methods`, `:microsecond`, `:millisecond`, `:min`, `:min_by`, `:minmax`, `:minmax_by`, `:mkdir`, `:mkfifo`, `:mktime`, `:mode`, `:module_eval`, `:module_exec`, `:module_function`, `:modulo`, `:mon`, `:monday?`, `:month`, `:mtime`, `:name`, `:name=`, `:name_list`, `:named_captures`, `:names`, `:nan?`, `:nano_den`, `:nano_num`, `:nanosecond`, `:negative?`, `:nesting`, `:never`, `:new`, `:new_seed`, `:newline`, `:next`, `:next!`, `:next_float`, `:next_values`, `:nfc`, `:nil?`, `:nlink`, `:none?`, `:nonzero?`, `:noreuse`, `:normal`, `:normalize`, `:normalized?`, `:now`, `:nsec`, `:num_waiting`, `:numerator`, `:object_id`, `:oct`, `:odd?`, `:of`, `:offset`, `:on_blocking`, `:one?`, `:open`, `:open_args`, `:operands_unification`, `:options`, `:ord`, `:original_name`, `:out`, `:owned?`, `:owner`, `:p`, `:pack`, `:parameters`, `:partial_input`, `:partition`, `:pass`, `:path`, `:peek`, `:peek_values`, `:peephole_optimization`, `:pending_interrupt?`, `:perm`, `:permutation`, `:pgroup`, `:phase`, `:pid`, `:pipe`, `:pipe?`, `:polar`, `:pop`, `:popen`, `:pos`, `:pos=`, `:positive?`, `:post_match`, `:ppid`, `:pre_match`, `:pred`, `:prepend`, `:prepend_features`, `:prepended`, `:prev_float`, `:primitive_convert`, `:primitive_errinfo`, `:print`, `:printf`, `:priority`, `:priority=`, `:private`, `:private_class_method`, `:private_constant`, `:private_instance_methods`, `:private_method_defined?`, `:private_methods`, `:proc`, `:product`, `:protected`, `:protected_instance_methods`, `:protected_method_defined?`, `:protected_methods`, `:public`, `:public_class_method`, `:public_constant`, `:public_instance_method`, `:public_instance_methods`, `:public_method`, `:public_method_defined?`, `:public_methods`, `:public_send`, `:push`, `:putback`, `:putc`, `:puts`, `:pwd`, `:que`, `:queue_waiters`, `:quo`, `:quote`, `:raise`, `:raised_exception`, `:rand`, `:random`, `:random_number`, `:rassoc`, `:rationalize`, `:raw_data`, `:raw_seed`, `:rdev`, `:rdev_major`, `:rdev_minor`, `:re_exchange`, `:re_exchangeable?`, `:read`, `:read_nonblock`, `:readable?`, `:readable_real?`, `:readagain_bytes`, `:readbyte`, `:readchar`, `:readline`, `:readlines`, `:readlink`, `:readpartial`, `:real`, `:real?`, `:realdirpath`, `:realpath`, `:reason`, `:receiver`, `:rect`, `:rectangular`, `:reduce`, `:refine`, `:regexp`, `:rehash`, `:reject`, `:reject!`, `:remainder`, `:remove_class_variable`, `:remove_const`, `:remove_instance_variable`, `:remove_method`, `:rename`, `:reopen`, `:repeated_combination`, `:repeated_permutation`, `:replace`, `:replacement`, `:replacement=`, `:replicate`, `:report`, `:require`, `:require_relative`, `:resolving`, `:respond_to?`, `:respond_to_missing?`, `:restore`, `:result`, `:resume`, `:return_value`, `:reverse`, `:reverse!`, `:reverse_each`, `:rewind`, `:rid`, `:rindex`, `:rjust`, `:rmdir`, `:rotate`, `:rotate!`, `:round`, `:rpartition`, `:rstrip`, `:rstrip!`, `:run`, `:s`, `:safe_level`, `:sample`, `:saturday?`, `:scan`, `:scrub`, `:scrub!`, `:search_convpath`, `:sec`, `:second`, `:seed`, `:seek`, `:select`, `:select!`, `:self`, `:send`, `:sequential`, `:set_backtrace`, `:set_encoding`, `:set_trace_func`, `:setbyte`, `:setegid`, `:seteuid`, `:setgid`, `:setgid?`, `:setpgid`, `:setpgrp`, `:setpriority`, `:setproctitle`, `:setregid`, `:setresgid`, `:setresuid`, `:setreuid`, `:setrgid`, `:setrlimit`, `:setruid`, `:setsid`, `:setuid`, `:setuid?`, `:shift`, `:shuffle`, `:shuffle!`, `:sid_available?`, `:signal`, `:signaled?`, `:signame`, `:signm`, `:signo`, `:sin`, `:singleton_class`, `:singleton_class?`, `:singleton_method`, `:singleton_method_added`, `:singleton_method_removed`, `:singleton_method_undefined`, `:singleton_methods`, `:sinh`, `:size`, `:size?`, `:skip`, `:sleep`, `:slice`, `:slice!`, `:slice_after`, `:slice_before`, `:slice_when`, `:socket?`, `:sort`, `:sort!`, `:sort_by`, `:sort_by!`, `:source`, `:source_buffer_empty`, `:source_encoding`, `:source_encoding_name`, `:source_location`, `:spawn`, `:specialized_instruction`, `:split`, `:sprintf`, `:sqrt`, `:squeeze`, `:squeeze!`, `:srand`, `:stack_caching`, `:start`, `:start_with?`, `:stat`, `:state`, `:status`, `:step`, `:sticky?`, `:stime`, `:stime=`, `:stop`, `:stop?`, `:stopped?`, `:stopsig`, `:store`, `:stress`, `:stress=`, `:strftime`, `:string`, `:strip`, `:strip!`, `:sub`, `:sub!`, `:submicro`, `:subsec`, `:succ`, `:succ!`, `:success?`, `:sum`, `:sunday?`, `:super_method`, `:superclass`, `:swapcase`, `:swapcase!`, `:switch`, `:symlink`, `:symlink?`, `:sync`, `:sync=`, `:synchronize`, `:syscall`, `:sysopen`, `:sysread`, `:sysseek`, `:system`, `:syswrite`, `:tag`, `:tailcall_optimization`, `:taint`, `:tainted?`, `:take`, `:take_while`, `:tan`, `:tanh`, `:tap`, `:tell`, `:terminate`, `:termsig`, `:test`, `:text`, `:textmode`, `:thread_machine_stack_size`, `:thread_variable?`, `:thread_variable_get`, `:thread_variable_set`, `:thread_variables`, `:thread_vm_stack_size`, `:throw`, `:thursday?`, `:times`, `:to`, `:to_a`, `:to_ary`, `:to_binary`, `:to_c`, `:to_enum`, `:to_f`, `:to_h`, `:to_hash`, `:to_i`, `:to_int`, `:to_io`, `:to_path`, `:to_proc`, `:to_r`, `:to_s`, `:to_str`, `:to_sym`, `:to_write_io`, `:total_time`, `:tr`, `:tr!`, `:tr_s`, `:tr_s!`, `:trace`, `:trace_instruction`, `:trace_var`, `:translate`, `:transpose`, `:trap`, `:truncate`, `:trust`, `:try_convert`, `:try_lock`, `:tty?`, `:tuesday?`, `:tv_nsec`, `:tv_sec`, `:tv_usec`, `:uid`, `:uid=`, `:umask`, `:unbind`, `:undef`, `:undef_method`, `:undefine_finalizer`, `:undefined_conversion`, `:ungetbyte`, `:ungetc`, `:unicode_normalize`, `:unicode_normalize!`, `:unicode_normalized?`, `:union`, `:uniq`, `:uniq!`, `:universal`, `:universal_newline`, `:unlink`, `:unlock`, `:unpack`, `:unsetenv_others`, `:unshift`, `:untaint`, `:untrace_var`, `:untrust`, `:untrusted?`, `:upcase`, `:upcase!`, `:update`, `:upto`, `:usec`, `:using`, `:utc`, `:utc?`, `:utc_offset`, `:utime`, `:utime=`, `:valid_encoding?`, `:value`, `:value?`, `:values`, `:values_at`, `:verify_internal_consistency`, `:wait`, `:wait2`, `:wait_readable`, `:wait_writable`, `:waitall`, `:waiters`, `:waitpid`, `:waitpid2`, `:wakeup`, `:warn`, `:wday`, `:wednesday?`, `:willneed`, `:with_index`, `:with_object`, `:world_readable?`, `:world_writable?`, `:writable?`, `:writable_real?`, `:write`, `:write_nonblock`, `:xml`, `:yday`, `:year`, `:yield`, `:zero?`, `:zip`, `:zone`, `:"{"`, `:|`, `:"||"`, `:"}"`, `:~`

## Initial Global/Special Variables

[More info](http://idiosyncratic-ruby.com/9-globalization.html)

    $ ruby --disable-all -e 'puts global_variables.sort.
    map{ |g| "`#{g.to_s.sub("`", "\\`")}`" }.join(", ")'

`$!`, `$"`, `$$`, `$&`, `$'`, `$*`, `$+`, `$,`, `$-0`, `$-F`, `$-I`, `$-K`, `$-W`, `$-a`, `$-d`, `$-i`, `$-l`, `$-p`, `$-v`, `$-w`, `$.`, `$/`, `$0`, `$1`, `$2`, `$3`, `$4`, `$5`, `$6`, `$7`, `$8`, `$9`, `$:`, `$;`, `$<`, `$=`, `$>`, `$?`, `$@`, `$DEBUG`, `$FILENAME`, `$KCODE`, `$LOADED_FEATURES`, `$LOAD_PATH`, `$PROGRAM_NAME`, `$SAFE`, `$VERBOSE`, `$\`, `$_`, `$$`, `$stderr`, `$stdin`, `$stdout`, `$~`

## Also See

- [List of exceptions](/32-no-more-errors.html)
- [The `ENV` object](/10-know-your-environment.html)
