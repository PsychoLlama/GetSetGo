# [UNMAINTAINED] GetSetGo
Getters and setters, but eventy.

In javascript, the idea of listening to get/set events is a powerful one.
Except that they're not really events. In order to register a listener, you
are _required_ to sacrifice mutability. It can no longer hold a value, because that's delegated to the getters and setters.

I wasn't going to let that stand.

GSG allows you to use getters and setters without murdering your variables. _You can keep your values_. It's just like a listener. But better.

## Maintenance Notice
I keep this project around because it's some of the first software I ever wrote. I'm sure this doesn't need to be said, but please never use this code.

## Usage
```
GSG(object, property)
  .get(handler)
  .set(otherHandler)
```
It's that simple. GetSetGo needs an object to bind to, so if
only a string is passed, it will assume the target is global. Example:

```
GSG('alert')
.get(function() {
  // count how many times alert has been used
  count++
})
```

If you want to prevent a get or set, you can use the function that's passed.
Why would you want to do that? The best example is when building an API.
If you have methods named `setValue()` or `getThingymabob()`, chances are you're already
doing it. Let's see an example:

```
GSG(playlist, 'song')
.get(function(value, resolve) {
  if (!playing) {
    // override the value by
    // 'resolving' something else
    resolve("No song playing")
  }
})
.set(function(value, newValue, reject) {
  if (newValue.constructor !== Song) {
    // That's not a song! Reject it!!
    reject()
  }
})
```

Notes:
- You can also have as many getters and setters as you'd like.
There's no limit.
- You don't need to use `new` with GSG, but you totally can if you want.
- GSG is smart and let's you define the same property limitlessly.

Welp, have fun out there! If you find any problems, submit an issue or a pull request.
Lemme know what you think!
