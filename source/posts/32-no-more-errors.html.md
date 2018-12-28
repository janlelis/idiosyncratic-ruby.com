---
title: No More Errors
date: 2016-05-01
tags: core, errors, cheatsheet
commit: 8668726f93d2f9a40cb95698aabbced44cbfe5b8
---

If you don't like errors in your code, you will have to fix them. This handy list of Ruby's errors will hopefully help you do so! (And welcome back for the second season of **Idiosyncratic Ruby**!)

ARTICLE

## Built-in Exceptions

Exception | Thrown by core Ruby when | Remarks
----------|--------------------------|--------
[NoMemoryError](https://ruby-doc.org/core/NoMemoryError.html) | The Ruby interpreter could not allocate the required memory | `"Idiosyncratic" * 100_000_000_000`
[ScriptError](https://ruby-doc.org/core/ScriptError.html) | - | Not thrown directly
[ScriptError → LoadError](https://ruby-doc.org/core/LoadError.html) | A source file could not be [loaded](https://ruby-doc.org/core/Kernel.html#method-i-load), [required](https://ruby-doc.org/core/Kernel.html#method-i-require), or [required relatively](https://ruby-doc.org/core/Kernel.html#method-i-require_relative) | It is meant for source code the current program is running and therefore should not be used for other kinds of files
[ScriptError → NotImplementedError](https://ruby-doc.org/core/NotImplementedError.html) | A feature of Ruby does not work on this platform/OS, for example, [fork](https://ruby-doc.org/core/Process.html#method-c-fork) | Although it is often used as "I have not implemented it (yet)", its original purpose is low-level platform support errors
[ScriptError → SyntaxError](https://ruby-doc.org/core/SyntaxError.html) | Invalid Ruby syntax was found | Do not raise when parsing some other file format fails. It is meant for source code that the current program is running.
[SecurityError](https://ruby-doc.org/core/SecurityError.html) | Mostly raised when attempting a forbidden [$SAFE level 1](http://ruby-doc.com/docs/ProgrammingRuby/html/taint.html) operation | Use as base class for critical security issues, which should intentionally not be rescued by default
[SignalException](https://ruby-doc.org/core/SignalException.html) | A signal is received | The common way to catch a signal is the [trap](https://ruby-doc.org/core/Signal.html#method-c-trap) method
[SignalException → Interrupt](https://ruby-doc.org/core/Interrupt.html) | An interrupt signal (SIGINT) is received | The common way to catch a signal is the [trap](https://ruby-doc.org/core/Signal.html#method-c-trap) method
[StandardError](https://ruby-doc.org/core/StandardError.html) | - | Base class for normal exceptions. See next table.
[SystemExit](https://ruby-doc.org/core/SystemExit.html) | Thrown by [Kernel#exit](https://ruby-doc.org/core/Kernel.html#method-i-exit) | Not thrown by [Kernel#exit!](https://ruby-doc.org/core/Kernel.html#method-i-exit-21)
[SystemStackError](https://ruby-doc.org/core/SystemStackError.html) | Raised for stack overflows, for example, in case of infinite recursion | Cannot always be caught by the interpreter
[fatal](https://ruby-doc.org/core/fatal.html) | When a [deadlock](https://github.com/ruby/ruby/blob/v2_3_0/thread.c#L4752-L4753) is discovered or [this special vm exception](https://github.com/ruby/ruby/blob/v2_3_0/eval.c#L1651) is triggered | Never rescuable. You can use this hack to get a reference to the error object: `ObjectSpace.each_object(Class){|c| break c if c.ancestors.include?(Exception) && c.name == 'fatal' }`
{:.table-24-38-X}

### StandardError

These will be caught by the `rescue` statement without defining an explicit error class.

Exception | Thrown by core Ruby when | Remarks
----------|--------------------------|--------
[ArgumentError](https://ruby-doc.org/core/ArgumentError.html) | Raised when a method is not given the proper arguments, for example, a wrong argument count | Best class to inherit from for custom errors describing that the method usage was wrong
[ArgumentError → UncaughtThrowError](https://ruby-doc.org/core/UncaughtThrowError.html) | When [throw](https://ruby-doc.org/core/Kernel.html#method-i-throw) is used without the proper [catch](https://ruby-doc.org/core/Kernel.html#method-i-catch) around | -
[EncodingError](https://ruby-doc.org/core/EncodingError.html) | Sometimes raised directly in [unicode edge cases](https://github.com/ruby/ruby/blob/v2_3_0/encoding.c#L182-L189) or when [symbols are broken](https://github.com/ruby/ruby/blob/v2_3_0/symbol.c#L433) | -
[EncodingError → Encoding:: CompatibilityError](https://ruby-doc.org/core/Encoding/CompatibilityError.html) | Raised when trying to combine strings of two incompatible encodings | Example: `"Idiosyn" +"crätic".encode("UTF-16LE")` under UTF-8 leads to `Encoding::CompatibilityError: incompatible character encodings: UTF-8 and UTF-16LE`
[EncodingError → Encoding:: ConverterNotFoundError](https://ruby-doc.org/core/Encoding/ConverterNotFoundError.html) | Raised when no encoding converter is available | Example: `"Idiosyncrätic".encode("ABC")` under UTF-8 leads to `Encoding::ConverterNotFoundError: code converter not found (UTF-8 to ABC)`
[EncodingError → Encoding:: InvalidByteSequenceError](https://ruby-doc.org/core/Encoding/InvalidByteSequenceError.html) | String contains byte sequences not valid in the current encoding | Example: `"Idiosyncr\u{D800}tic".encode("ASCII")` under UTF-8 leads to `Encoding::InvalidByteSequenceError: "\xED" followed by "\xA0" on UTF-8`
[EncodingError → Encoding:: UndefinedConversionError](https://ruby-doc.org/core/Encoding/UndefinedConversionError.html) | Raised when an encoding converter is available, but it cannot convert a specific codepoint | Example: `"\u{00A0}".encode("EUC-JP")` under UTF-8 leads to `Encoding::UndefinedConversionError: U+00A0 from UTF-8 to EUC-JP`
[FiberError](https://ruby-doc.org/core/Fiber.html) | Raised when an invalid operation is attempted on a [Fiber](https://ruby-doc.org/core/Fiber.html) | Such as: Attempting to call/resume a dead Fiber, yield from the root fiber, calling a Fiber across threads
[IOError](https://ruby-doc.org/core/IOError.html) | Raised when an [IO](https://ruby-doc.org/core/IO.html) operation fails, like opening a file | Pay attention that there are some failures will raise a `SystemCallError`, which is not a sub-class of `IOError`!
[IOError → EOFError](https://ruby-doc.org/core/EOFError.html) | Raised by many [IO](https://ruby-doc.org/core/IO.html) operations when reaching the end of file | -
[IndexError](https://ruby-doc.org/core/IndexError.html) | Raised when an element or deducted value cannot be retrieved, for example, when using [Array#fetch](https://ruby-doc.org/core/Array.html#method-i-fetch) | Thrown by many core classes like Array, Regex, String, Struct or some standard libraries like [strscan](https://ruby-doc.org/stdlib/libdoc/strscan/rdoc/StringScanner.html)
[IndexError → KeyError](https://ruby-doc.org/core/KeyError.html) | Raised when an element cannot be retrieved (by a key), for example, when using [Hash#fetch](https://ruby-doc.org/core/Hash.html#method-i-fetch) | Mainly used by hashes
[IndexError → StopIteration](https://ruby-doc.org/core/StopIteration.html) | Raised when an [external iterator](https://ruby-doc.org/core/Enumerator.html) has [reached its end](https://ruby-doc.org/core/StopIteration.html) | You can use the [Kernel#loop](https://ruby-doc.org/core/Kernel.html#method-i-loop) method to automatically catch `StopIteration`
[IndexError → StopIteration → ClosedQueueError](https://ruby-doc.org/core/ClosedQueueError.html) | Raised when trying to modify a [closed Queue](https://ruby-doc.org/core/Queue.html#method-i-close) | -
[LocalJumpError](https://ruby-doc.org/core/LocalJumpError.html) | Thrown when an invalid control flow operation is attempted, like calling `yield` from a method that was not passed a block to | `LocalJumpError`s contains a `reason` and an `exit_value` property from the last valid context
[Math::DomainError](https://ruby-doc.org/core/Math/DomainError.html) | An invalid mathematical operation was attempted, for example, trying to calculate the [arctan](https://en.wikipedia.org/wiki/Inverse_trigonometric_functions) of a value greater than 1 | -
[NameError](https://ruby-doc.org/core/NameError.html) | Raised when referencing things that do not exist, like unknown constants | -
[NameError → NoMethodError](https://ruby-doc.org/core/NoMethodError.html) | Raised if trying to call a method that does not exist, and no [`method_missing`](https://ruby-doc.org/core/BasicObject.html#method-i-method_missing) is defined | Trying to call non-existent private methods of `self` (like `Kernel#puts`) will result in `NameError` instead of `NoMethodError`, because it could also have been a local variable
[RangeError](https://ruby-doc.org/core/RangeError.html) | A numerical number is off, most often it is too small or big | For example, `[].pack("C100000000000000000000")` does not work, because [pack](https://idiosyncratic-ruby.com/4-what-the-pack.html#c--an-unsigned-integer-per-byte) requires the number to fit into `long`
[RangeError → FloatDomainError](https://ruby-doc.org/core/FloatDomainError.html) | Raised when trying to convert a special Float value (`NaN`, `Float::INFINITY`) to another number format that does not support special values | -
[RegexpError](https://ruby-doc.org/core/RegexpError.html) | Raised when trying to dynamically create an invalid regex | -
[RuntimeError](https://ruby-doc.org/core/RuntimeError.html) | Unspecific occurrences | Default error class that will be used when raising a string: `raise "something"`
[RuntimeError → FrozenError](https://ruby-doc.org/core/FrozenError.html) | Raised when trying to modify a frozen object | Introduced with Ruby 2.5
[SystemCallError](https://ruby-doc.org/core/SystemCallError.html) | - | Lower level system call errors. See next table.
[ThreadError](https://ruby-doc.org/core/ThreadError.html) | Raised for invalid [Thread](https://ruby-doc.org/core/Thread.html) operations | -
[TypeError](https://ruby-doc.org/core/TypeError.html) | Violations against Ruby's type system | For example, `"" + nil` will lead to "TypeError: no implicit conversion of nil into String"
[ZeroDivisionError](https://ruby-doc.org/core/ZeroDivisionError.html) | An integer, complex, or rational number was tried to divide by another integer, complex, or rational number | Floats and BigDecimal return Infinity, negative Infinity, or `NaN`
{:.table-24-38-X}

### SystemCallError

These errors are thrown by the operating system under certain circumstances. The exact list depends on your platform and can be found in [a file called `errno.h`](https://www.gnu.org/software/libc/manual/html_node/Error-Codes.html). You get such errors when working with processes, [sockets](https://ruby-doc.org/stdlib/libdoc/socket/rdoc/Socket.html#method-i-connect-label-Unix-based+Exceptions), files, and other functionality that relies on low level system operations.

What follows is the list of errors that are known by Ruby. The error numbers and messages were generated on a recent ubuntu Linux machine. All system call errors are namespaced under `Errno::` and can be dynamically created using `SystemCallError.new(number)`.

Exception                | No  | Message | Example One-Liner¹
-------------------------|-----|---------|-------------------
Errno::E2BIG             | 7   | Argument list too long | -
Errno::EACCES            | 13  | Permission denied | As non-root: `File.read('/root')`
Errno::EADDRINUSE        | 98  | Address already in use | `require "socket"; 2.times{ TCPServer.new("", 3003) }`
Errno::EADDRNOTAVAIL     | 99  | Cannot assign requested address | -
Errno::EADV              | 68  | Advertise error | -
Errno::EAFNOSUPPORT      | 97  | Address family not supported by protocol | -
Errno::EAGAIN            | 11  | Resource temporarily unavailable | -
[Errno::EAGAIN → IO::EAGAINWaitReadable](https://ruby-doc.org/core/IO/EAGAINWaitReadable.html)² | - | - | `STDIN.read_nonblock(1)` (if blocking)
[Errno::EAGAIN → IO::EAGAINWaitWritable](https://ruby-doc.org/core/IO/EAGAINWaitWritable.html)² | - | - | -
Errno::EALREADY          | 114 | Operation already in progress | -
Errno::EBADE             | 52  | Invalid exchange | -
Errno::EBADF             | 9   | Bad file descriptor | `IO.new(-1)`
Errno::EBADFD            | 77  | File descriptor in bad state | -
Errno::EBADMSG           | 74  | Bad message | -
Errno::EBADR             | 53  | Invalid request descriptor | -
Errno::EBADRQC           | 56  | Invalid request code | -
Errno::EBADSLT           | 57  | Invalid slot | -
Errno::EBFONT            | 59  | Bad font file format | -
Errno::EBUSY             | 16  | Device or resource busy | -
Errno::ECANCELED         | 125 | Operation canceled | -
Errno::ECHILD            | 10  | No child processes | `Process.wait` (with no child processes)
Errno::ECHRNG            | 44  | Channel number out of range | -
Errno::ECOMM             | 70  | Communication error on send | -
Errno::ECONNABORTED      | 103 | Software caused connection abort | -
Errno::ECONNREFUSED      | 111 | Connection refused | `require "socket"; TCPSocket.new("", rand(987654321))`
Errno::ECONNRESET        | 104 | Connection reset by peer | -
Errno::EDEADLK           | 35  | Resource deadlock avoided | -
Errno::EDEADLOCK         | 35  | Resource deadlock avoided | -
Errno::EDESTADDRREQ      | 89  | Destination address required | -
Errno::EDOM              | 33  | Numerical argument out of domain | -
Errno::EDOTDOT           | 73  | RFS specific error | -
Errno::EDQUOT            | 122 | Disk quota exceeded | -
Errno::EEXIST            | 17  | File exists | `Dir.mkdir("/")`
Errno::EFAULT            | 14  | Bad address | -
Errno::EFBIG             | 27  | File too large | -
Errno::EHOSTDOWN         | 112 | Host is down | -
Errno::EHOSTUNREACH      | 113 | No route to host | -
Errno::EHWPOISON         | 133 | Memory page has hardware error | -
Errno::EIDRM             | 43  | Identifier removed | -
Errno::EILSEQ            | 84  | Invalid or incomplete multibyte or wide character | -
Errno::EINPROGRESS       | 115 | Operation now in progress | -
[Errno::EINPROGRESS → IO::EINPROGRESSWaitReadable](https://ruby-doc.org/core/IO/EINPROGRESSWaitReadable.html)² | - | - | -
[Errno::EINPROGRESS → IO::EINPROGRESSWaitWritable](https://ruby-doc.org/core/IO/EINPROGRESSWaitWritable.html)² | - | - | -
Errno::EINTR             | 4   | Interrupted system call | -
Errno::EINVAL            | 22  | Invalid argument | `Process.clock_gettime(42)`
Errno::EIO               | 5   | Input/output error | -
Errno::EISCONN           | 106 | Transport endpoint is already connected | -
Errno::EISDIR            | 21  | Is a directory | `File.read("/")`
Errno::EISNAM            | 120 | Is a named type file | -
Errno::EKEYEXPIRED       | 127 | Key has expired | -
Errno::EKEYREJECTED      | 129 | Key was rejected by service | -
Errno::EKEYREVOKED       | 128 | Key has been revoked | -
Errno::EL2HLT            | 51  | Level 2 halted | -
Errno::EL2NSYNC          | 45  | Level 2 not synchronized | -
Errno::EL3HLT            | 46  | Level 3 halted | -
Errno::EL3RST            | 47  | Level 3 reset | -
Errno::ELIBACC           | 79  | Can not access a needed shared library | -
Errno::ELIBBAD           | 80  | Accessing a corrupted shared library | -
Errno::ELIBEXEC          | 83  | Cannot exec a shared library directly | -
Errno::ELIBMAX           | 82  | Attempting to link in too many shared libraries | -
Errno::ELIBSCN           | 81  | .lib section in a.out corrupted | -
Errno::ELNRNG            | 48  | Link number out of range | -
Errno::ELOOP             | 40  | Too many levels of symbolic links | -
Errno::EMEDIUMTYPE       | 124 | Wrong medium type | -
Errno::EMFILE            | 24  | Too many open files | -
Errno::EMLINK            | 31  | Too many links | -
Errno::EMSGSIZE          | 90  | Message too long | -
Errno::EMULTIHOP         | 72  | Multihop attempted | -
Errno::ENAMETOOLONG      | 36  | File name too long | `File.read("Ruby"*1000)`
Errno::ENAVAIL           | 119 | No XENIX semaphores available | -
Errno::ENETDOWN          | 100 | Network is down | -
Errno::ENETRESET         | 102 | Network dropped connection on reset | -
Errno::ENETUNREACH       | 101 | Network is unreachable | -
Errno::ENFILE            | 23  | Too many open files in system | -
Errno::ENOANO            | 55  | No anode | -
Errno::ENOBUFS           | 105 | No buffer space available | -
Errno::ENOCSI            | 50  | No CSI structure available | -
Errno::ENODATA           | 61  | No data available | -
Errno::ENODEV            | 19  | No such device | -
Errno::ENOENT            | 2   | No such file or directory | `File.read("does not exist")`
Errno::ENOEXEC           | 8   | Exec format error | -
Errno::ENOKEY            | 126 | Required key not available | -
Errno::ENOLCK            | 37  | No locks available | -
Errno::ENOLINK           | 67  | Link has been severed | -
Errno::ENOMEDIUM         | 123 | No medium found | -
Errno::ENOMEM            | 12  | Cannot allocate memory | -
Errno::ENOMSG            | 42  | No message of desired type | -
Errno::ENONET            | 64  | Machine is not on the network | -
Errno::ENOPKG            | 65  | Package not installed | -
Errno::ENOPROTOOPT       | 92  | Protocol not available | -
Errno::ENOSPC            | 28  | No space left on device | -
Errno::ENOSR             | 63  | Out of streams resources | -
Errno::ENOSTR            | 60  | Device not a stream | -
Errno::ENOSYS            | 38  | Function not implemented | -
Errno::ENOTBLK           | 15  | Block device required | -
Errno::ENOTCONN          | 107 | Transport endpoint is not connected | -
Errno::ENOTDIR           | 20  | Not a directory | -
Errno::ENOTEMPTY         | 39  | Directory not empty | -
Errno::ENOTNAM           | 118 | Not a XENIX named type file | -
Errno::ENOTRECOVERABLE   | 131 | State not recoverable | -
Errno::ENOTSOCK          | 88  | Socket operation on non-socket | -
Errno::ENOTSUP           | 95  | Operation not supported | -
Errno::ENOTTY            | 25  | Inappropriate ioctl for device | -
Errno::ENOTUNIQ          | 76  | Name not unique on network | -
Errno::ENXIO             | 6   | No such device or address | -
Errno::EOPNOTSUPP        | 95  | Operation not supported | -
Errno::EOVERFLOW         | 75  | Value too large for defined data type | -
Errno::EOWNERDEAD        | 130 | Owner died | -
Errno::EPERM             | 1   | Operation not permitted | -
Errno::EPFNOSUPPORT      | 96  | Protocol family not supported | -
Errno::EPIPE             | 32  | Broken pipe | -
Errno::EPROTO            | 71  | Protocol error | -
Errno::EPROTONOSUPPORT   | 93  | Protocol not supported | -
Errno::EPROTOTYPE        | 91  | Protocol wrong type for socket | -
Errno::ERANGE            | 34  | Numerical result out of range | -
Errno::EREMCHG           | 78  | Remote address changed | -
Errno::EREMOTE           | 66  | Object is remote | -
Errno::EREMOTEIO         | 121 | Remote I/O error | -
Errno::ERESTART          | 85  | Interrupted system call should be restarted | -
Errno::ERFKILL           | 132 | Operation not possible due to RF-kill | -
Errno::EROFS             | 30  | Read-only file system | -
Errno::ESHUTDOWN         | 108 | Cannot send after transport endpoint shutdown | -
Errno::ESOCKTNOSUPPORT   | 94  | Socket type not supported | -
Errno::ESPIPE            | 29  | Illegal seek | -
Errno::ESRCH             | 3   | No such process | `Process.kill(:KILL, 987654321)`
Errno::ESRMNT            | 69  | Surmount error | -
Errno::ESTALE            | 116 | Stale file handle | -
Errno::ESTRPIPE          | 86  | Streams pipe error | -
Errno::ETIME             | 62  | Timer expired | -
Errno::ETIMEDOUT         | 110 | Connection timed out | -
Errno::ETOOMANYREFS      | 109 | Too many references: cannot splice | -
Errno::ETXTBSY           | 26  | Text file busy | -
Errno::EUCLEAN           | 117 | Structure needs cleaning | -
Errno::EUNATCH           | 49  | Protocol driver not attached | -
Errno::EUSERS            | 87  | Too many users | -
Errno::EWOULDBLOCK³      | 11  | Resource temporarily unavailable | -
Errno::EXDEV             | 18  | Invalid cross-device link | -
Errno::EXFULL            | 54  | Exchange full | -
Errno::NOERROR           | 0   | Success | -
{:.table-30-8-36-X}

¹ Feel free to [suggest more one-liners](https://github.com/janlelis/idiosyncratic-ruby.com/issues/new)<br/>
² These include `IO::WaitReadable`/`IO::WaitWritable`. See [IO#read_nonblock](https://ruby-doc.org/core/IO.html#method-i-read_nonblock).<br/>
³ EAGAIN == EWOULDBLOCK [on most systems](https://stackoverflow.com/questions/7003234/which-systems-define-eagain-and-ewouldblock-as-different-values)

## Resources

- [RDoc: Exception](https://ruby-doc.org/core/Exception.html)
- [Source: defs/known_errors.def](https://github.com/ruby/ruby/blob/trunk/defs/known_errors.def)
- [Popular Errno Codes by Platform](http://www.ioplex.com/~miallen/errcmpp.html)
