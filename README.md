# <img src="https://user-images.githubusercontent.com/15625446/142420094-c2c26925-67ac-4e57-bde2-746abe80fd7e.png" width="25"> Run.it

A Chrome extension that lets you run local terminal commands on your local Linux / MacOS machine directly from the browser.

<img src="https://user-images.githubusercontent.com/15625446/142419418-3e35d17e-cb2a-4ae2-9c20-db96c827ec77.png" width="300">

## Why do I need it? :confused:

Here are some possible cases where the extension immensely accelerates working with the [shell](https://www.tutorialspoint.com/unix/unix-what-is-shell.htm):

- Installing `npm` or Python libraries from a documentation website
- Setting up a Linux installation _(especially Arch!)_
- Fixing a bug in Linux _(maybe the Wi-Fi wasn't working and you need a `board.bin`?)_

## I want it! :wrench:

_Coming soon to the [Chrome Web Store](https://chrome.google.com/webstore)!_

As of now, head over to [releases](https://github.com/theGeekyLad/run.it-extension/releases) and install the latest you can find _(and maybe ... pin it?)_.

## What's in it? :gem:

Here's what you can do with the extension:

![run it-demo](https://user-images.githubusercontent.com/15625446/142419634-59eeca6e-1934-4a5f-8ad9-a0d9b7bbf680.gif)

- Open [a website](https://askubuntu.com/a/429950/959312) that contains some commands
- Use the mouse to select a command
- Right-click and select _Run command_
- Wait for a success notification!
- Click the extension icon in the Chrome extension bar (or `Alt+X`)
- See the output and be zen!

## FAQ :raising_hand_woman:

### Does it work with `sudo`?

In short, yes. Read on to know how.

### I'm concerned. How exactly does `sudo` work?

For privacy sakes, you're totally justified wanting to know. Well, every other layer of abstraction over password input increases your chances of getting snooped. This feature is no exception. As of now, the password is bundled into the body of every POST request to a local Node.js server that ultimately executes the command in question. The password is _in clear_ and _not_ hashed and if you're serious about stuff like MITM, I'd recommend you clear the password from the extension settings (which also clears it from the browser storage). In that case, you're super safe for sure but, of course, you can't run `sudo` commands!

### I ran a command with this extension but didn't receive a notification of completion. What's going on?

It's quite likely that the command is waiting for some kind of user input or the `sudo` password could be wrong or maybe the command is long-running.

<br>

Made with :heart: by `theGeekyLad`
