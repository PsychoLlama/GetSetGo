# TetherJS
TetherJS gives you brief syntax for defining getters and setters in JavaScript,
and also fixes some of the irritating quirks.

For one, the idea of listening to get/set events brings some powerful ideas.
Except that they're not really events. In order to register a listener, you
are _required_ to sacrifice mutability. You can't set that property to a value, and you
can't retrieve it later. That is delegated to the getters and setters.

I wasn't going to let that stand.

The Tether constructor allows you to keep the powerful event paradigm without breaking
anything. You can subscribe to those events, and still set the value of your
property. It's exactly like a listener should be.

## Usage
```
new Tether(object, property)
.to({
  get: yourListener,
  set: yourOtherListener
});
```
It's that simple. Tether needs the parent Object and the property,
then you just pass your listeners to the associated event.

If you want to deny a get or set, you can throw an error inside of your listener and
the get/set operation won't finish. Why would you want to do that? How should I know.
It's you we're talking about.
Here's my guess:
```
new Tether(window, 'superSecretPlans')
.to({
  get: function() {
    if (!validPassword(user.password)) {
      throw new Error("Get off my lawn!");
    }
  }
});
```
You could also validate an argument before allowing it to be set:
```
...
.to({
  set: function(newVal) {
    if (newVal !== 'llama') {
      throw new Error("BEEEEEEP you failed");
    }
  }
});
```
> please note that using these errors in production code may cause bodily injury.
Please do not use these errors in production code to avoid bodily injury. Thank you.<br />
_a message from DMV_
