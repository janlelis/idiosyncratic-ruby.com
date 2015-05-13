---
title: Run Ruby, Run!
date: 2015-05-06
tags: stdlib, http, unix, golf
commit: 7a392db0fe66509c07200f9cb74888c250a87bfb
---

There is a one-liner on the internet that will start a local web server, for serving all the static files in your current directory:

ARTICLE

    $ python -m SimpleHTTPServer 8080

Or with Python 3:

    $ python3 -m http.server

Rubyists generally do not want to rely on Python, so there is a Ruby equivalent:

    $ ruby -run -e httpd . -p 8080

This will fire up a very simple server, written in Ruby, using [WEBrick](http://ruby-doc.org/stdlib-2.2.2/libdoc/webrick/rdoc/WEBrick.html) under the hood!

It also takes some more options, see at bottom of this post for a listing of available ones.

How does this work and what does it do exactly? First of all, what does `ruby -run` mean? The answer might be surprising: It could be rewritten as:

    $ ruby -require "un" -e "httpd" . -p 8080

The `-e` option directly executes the ruby code given, and `-r` is the short version of `--require`. So it requires "un", which happens to be included in Ruby's standard library¹. It was written by Hirofumi WATANABE (eban), a long-time Ruby contributer and code golf star. `un.rb`s goal is to
provide:

    # Utilities to replace common UNIX commands in Makefiles etc

¹ The same is possible for [requiring rubygems](https://github.com/ruby/ruby/blob/trunk/lib/ubygems.rb)

Let's see, what else is included:

    #   ruby -run -e cp             -- [OPTION] SOURCE DEST
    #   ruby -run -e ln             -- [OPTION] TARGET LINK_NAME
    #   ruby -run -e mv             -- [OPTION] SOURCE DEST
    #   ruby -run -e rm             -- [OPTION] FILE
    #   ruby -run -e mkdir          -- [OPTION] DIRS
    #   ruby -run -e rmdir          -- [OPTION] DIRS
    #   ruby -run -e install        -- [OPTION] SOURCE DEST
    #   ruby -run -e chmod          -- [OPTION] OCTAL-MODE FILE
    #   ruby -run -e touch          -- [OPTION] FILE
    #   ruby -run -e wait_writable  -- [OPTION] FILE
    #   ruby -run -e mkmf           -- [OPTION] EXTNAME [OPTION]
    #   ruby -run -e httpd          -- [OPTION] DocumentRoot
    #   ruby -run -e help [COMMAND]

Besides **httpd**, you mostly get `FileUtils` based implementations of common unix tools,: `cp`, `ln`, `mv`, `rm`, `mkdir`, `rmdir`, `install`, `chmod`, and `touch`.

There are two more commands included, which don't fit into this unix category: [mkmf](http://ruby-doc.org/stdlib-2.2.2/libdoc/mkmf/rdoc/MakeMakefile.html), which you can use to create the Makefile for a Ruby C extension and [wait_writable](https://github.com/ruby/ruby/blob/ruby_2_2/lib/un.rb#L233-L264), which allows you to continuously try to open a file in writable mode.

## `-run` Reference

What follows is a reference of all **un** commands. Also checkout the integrated help with:

    $ ruby -run -e help COMMAND

### Copy Files

    $ ruby -run -e cp SOURCE DEST [OPTIONS]

 Argument | Description
----------|------------
SOURCE    | File to copy
DEST      | Where to copy the file

   Option | Description
----------|------------
-p        | Preserve file attributes if possible
-r        | Copy directories recursively
-v        | Verbose mode (print executed shell command)

### Create Symlink

    $ ruby -run -e ln TARGET LINK_NAME [OPTIONS]

 Argument | Description
----------|------------
TARGET    | File to create symlink from
LINK_NAME | Where to create the symlink

   Option | Description
----------|------------
-s        | Make symbolic links instead of hard links
-f        | Overwrite files, which already exists at destination
-v        | Verbose mode (print executed shell command)

### Move File

    $ ruby -run -e mv SOURCE DEST [OPTIONS]

 Argument | Description
----------|------------
SOURCE    | File to move
DEST      | Where to move the file

   Option | Description
----------|------------
-v        | Verbose mode (print executed shell command)

### Remove File

    $ ruby -run -e rm FILE [OPTIONS]

 Argument | Description
----------|------------
FILE      | File(s) to remove

   Option | Description
----------|------------
-f        | Do nothing if file does not exist
-r        | Remove the contents of directories recursively
-v        | Verbose mode (print executed shell command)

### Create Directory

    $ ruby -run -e mkdir DIRS [OPTIONS]

 Argument | Description
----------|------------
DIRS      | Director(y/ies) to create

   Option | Description
----------|------------
-p        | Don't fail if directory already exists<br>Create all directories necessary
-v        | Verbose mode (print executed shell command)

### Remove Directory

    $ ruby -run -e rmdir DIRS [OPTIONS]

 Argument | Description
----------|------------
DIRS      | Director(y/ies) to remove

   Option | Description
----------|------------
-p        | Also remove directory's ancestors
-v        | Verbose mode (print executed shell command)

### Copy Files and Set Attributes

    $ ruby -run -e install SOURCE DEST [OPTIONS]

 Argument | Description
----------|------------
SOURCE    | File to copy
DEST      | Where to copy the file

   Option | Description
----------|------------
-p        | Apply access/modification times of SOURCE files to
          | corresponding destination files
-m        | Set permission mode (as in chmod), instead of 0755
-v        | Verbose mode (print executed shell command)

###  Change File Mode

    $ ruby -run -e chmod OCTAL-MODE FILE [OPTIONS]

 Argument | Description
----------|------------
OCTAL-MODE| File mode to set as octal number
FILE      | File(s) to operate on

   Option | Description
----------|------------
-v        | Verbose mode (print executed shell command)

### Update File Timestamp or Create Empty File

    $ ruby -run -e touch FILE [OPTIONS]

 Argument | Description
----------|------------
FILE      | File(s) to touch

   Option | Description
----------|------------
-v        | Verbose mode (print executed shell command)

### Wait until File gets Writable

    $ ruby -run -e wait_writable FILE [OPTIONS]

 Argument | Description
----------|------------
FILE      | File(s) to wait for

   Option | Description
----------|------------
-n RETRY  | Count how often to retry
-w SEC    | Time to wait between retries (in seconds)
-v        | Verbose mode (print access errors)

### Make Makefile

    $ ruby -run -e mkmf EXTNAME [OPTIONS]

 Argument | Description
----------|------------
EXTNAME   | Extension name

   Option | Description
----------|------------
  -d ARGS | Run dir_config
  -h ARGS | Run have_header
  -l ARGS | Run have_library
  -f ARGS | Run have_func
  -v ARGS | Run have_var
  -t ARGS | Run have_type
  -m ARGS | Run have_macro
  -c ARGS | Run have_const
 --vendor | Install to vendor_ruby

### Serve Static Files via HTTP

    $ ruby -run -e httpd DOCUMENT_ROOT [OPTIONS]

Argument      | Description
--------------|------------
DOCUMENT_ROOT | Directory to serve

Option                    | Short | Description                        | Example
--------------------------|-------|------------------------------------|--------
--bind-adress=ADDR        | -b    | IP address to bind to              | `-b 127.0.0.1`
--port=NUM                | -p    | Port number to listen on           | `-p 8080`
--max-clients=MAX         | -m    | Max number of simultaneous clients | `-m 2`
--temp-dir=DIR            | -t    | Temporary directory to use         | `-t /tmp`
--do-not-reverse-lookup   | -d    | Disable reverse lookup             | `-d`
--request-timeout=SECOND  | -r    | Request timeout (in seconds)       | `-r 2`
--http-version=VERSION    |       | HTTP version                       | `--http-version=1.0`
                          | -v    | Start WEBrick in verbose mode      | `-v`
{:.table-30-10-35-X}

## Further Reading

- [un.rb](https://github.com/ruby/ruby/blob/trunk/lib/un.rb)
- [Collection of one-liners that start a static server](https://gist.github.com/willurd/5720255)