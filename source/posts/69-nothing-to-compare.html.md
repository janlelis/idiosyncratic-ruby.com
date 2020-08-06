---
title: Nothing to Compare
date: 2020-08-06
tags: core, equal, types
---

How does nothing (as in *nil*, *null*, or *nan*) compare to nothing?

ARTICLE

## Equality Equality

**==**  | `nil`    | `0`      | `0.0`    | `0i`     | `0r`     | `NaN`¹
--------|----------|----------|----------|----------|----------|------
`nil`   | **true** | false    | false    | false    | false    | false
`0`     | false    | **true** | **true** | **true** | **true** | false
`0.0`   | false    | **true** | **true** | **true** | **true** | false
`0i`    | false    | **true** | **true** | **true** | **true** | false
`0r`    | false    | **true** | **true** | **true** | **true** | false
`NaN`   | false    | false    | false    | false    | false    | false

¹ Get a reference to `NaN` via `Float::NAN` or by executing `0.0/0`

### Take Aways

- `0` == `0.0` == `0i` == `0r`
- `NaN` != `NaN`

## Fancy Equality

**===** | `nil`    | `0`      | `0.0`    | `0i`     | `0r`     | `NaN`
--------|----------|----------|----------|----------|----------|------
`nil`   | **true** | false    | false    | false    | false    | false
`0`     | false    | **true** | **true** | **true** | **true** | false
`0.0`   | false    | **true** | **true** | **true** | **true** | false
`0i`    | false    | **true** | **true** | **true** | **true** | false
`0r`    | false    | **true** | **true** | **true** | **true** | false
`NaN`   | false    | false    | false    | false    | false    | false

### Take Away

- Same as `==` for null values

## Hash Key Equality

**.eql?**| `nil`    | `0`      | `0.0`    | `0i`     | `0r`     | `NaN`
--------|----------|----------|----------|----------|----------|------
`nil`   | **true** | false    | false    | false    | false    | false
`0`     | false    | **true** | false    | false    | false    | false
`0.0`   | false    | false    | **true** | false    | false    | false
`0i`    | false    | false    | false    | **true** | false    | false
`0r`    | false    | false    | false    | false    | **true** | false
`NaN`   | false    | false    | false    | false    | false    | false

### Take Away

- Different types of `0`s do not `.eql?`

## Object Identity

**.equal?**| `nil`    | `0`      | `0.0`    | `0i`     | `0r`     | `NaN`
--------|-------|-------|-------|-------|-------|-------|------
`nil`   | **true** | false    | false    | false    | false    | false
`0`     | false    | **true** | false    | false    | false    | false
`0.0`   | false    | false    | **true** | false    | false    | false
`0i`    | false    | false    | false    | **true** | false    | false
`0r`    | false    | false    | false    | false    | **true** | false
`NaN`   | false    | false    | false    | false    | false    | **true**

### Take Away

- `NaN` is the same Object as `NaN`

## Also See

- [Episode 55: Struggling Four Equality](/55-struggling-four-equality.html)