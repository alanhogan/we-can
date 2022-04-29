# We

(`we-can` by package name, `We` by usage)

**We-can is a small, simple, TypeScripted library for asynchronously defining client-side abilities and executing them.** It is designed not for driving behavior in a single-page web app, although you could probably use it there. No, it is designed for progressively enhancing that rare commodity, a “web page.”

But it’s actually extremely simple, and this README has more words than the source code does.

The API is extremely small. And no, you don’t need to use it as TypeScript; it just gave me more confidence to write it in TypeScript.

You can even just paste what you need. It’s not like this micro-library will see big updates with painful migrations.

Here’s what we’ve got:

```js
// Assumption: You have already imported, required, or copy-pasted
// in we-can.js so that you have access to the object `We`

// Define abilities (or call them activities)
We.can("someVerbPhrase", function () {
  implementationOfHowToDoThat();
});

// Perform ability.
// It happens immediately...
We.should("someVerbPhrase");

// ...unless the ability hasn't been defined yet.
We.should("deObfuscateEmails");

// We haven't learned how to do that yet. But that’s OK.
// We will remember that we should do it when we can. :-)

// Let's learn that ability.
We.can("deObfuscateEmails", () => {
  document.querySelectorAll(".js-obfuscated-email").foreach((el) => {
    el.innerText = el.innerText.replace(" at ", "@");
    // Makes future calls to this ability skip processing of this element:
    el.classList.remove("js-obfuscated-email");
  });
});

// At this point, all the emails will be de-obfuscated.
// The exception is that if there is an as-yet-unlearned
// ability ahead of it in the queue. In that case, we will
// continue to wait.
```

So, in summation, `We.can` activity definitions and `We.should` requests to perform activities can happen in any order. You can define abilities before attempting to use them or vice-versa. However, note that activities are performed in the order they were added to the queue.

There is also one small utility included:

```js
We.utils.loadScript(url, callback);
```

This can help you learn 'heavy' activities as needed.

In fact, from another script loaded after We is available globally, call `We.can()` to define how to perform an ability.

```js
// wysiwyg.js:
/* multiple KB of code here... and eventually: */
We.can("insertWysiwygEditor", function () {
  // (find mount point and instantiate a WYSIWYG editor there)
});
```

This gives you the ability to just-in-time download code whenever it's needed. Example:

```js
//main.js:
We.canLearnTo("insertWysiwygEditor", "/scripts/wysiwyg.js");

// The above script will not be loaded until the first time you do:
We.can("insertWysiwygEditor");
// Since we know how to learn that activity (by loading the script referenced above),
// at this point we will do that asynchronously, which will cause the activity
// to be performed upon success. Otherwise, an error will be thrown.
```
