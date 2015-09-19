# GetSetGo
This library gives you brief syntax for defining getters and setters in JavaScript,
and also fixes some of the irritating quirks.

For one, the idea of listening to get/set events brings some powerful ideas.
Except that they're not really events. In order to register a listener, you
are _required_ to sacrifice mutability. You can't set that property to a value, and you
certainly can't retrieve it later. That is delegated to the getters and setters.

I wasn't going to let that stand.

The GSG constructor allows you to keep the powerful event paradigm without breaking
anything. You can subscribe to those events, and still set the value of your
property. It's exactly like a listener should be.

## Usage
```
GSG(object, property)
.get(yourListener)
.set(yourOtherListener);
```
It's that simple. GetSetGo needs an object that your property belongs to, and if
only a string is passed, it will assume the target is the global object, like so:

```
GSG('alert')
.get(function() {
  // Find out how many times it's been used
});
```

If you want to prevent a get or set, you can return special values.
Why would you want to do that? How should I know.
It's you we're talking about.
Here's my guess:

```
GSG(company, 'secretPlans')
.get(function() {
  if (!validPassword(user.password)) {
    // return anything other than undefined,
    //  and it will get that instead.
    return "Get off my lawn!";
  }
});
.set(function(arg) {
  if (arg.constructor != MajesticLlama) {
    // returning false rejects the value.
    //  In this case, it will not be set.
    return false;
  }
});
```

Notes:
- You can also have as many getters and setters as you'd like.
There's no limit.
- You can totally use `new` with GSG if you want.
It doesn't change anything, so it's just a matter of readability.
- GSG is smart and will always return the same object for the same property.

Welp, have fun out there! If you find any issues, lemme know or submit a pull request.
I'd love to hear from you!
