# Send Embeds with Discord

## Usage
you use this template to send embed
```
    $E
    title:              Your title
    description:        Your description
    url:                The url your title sends you to when you click it
    color:              The hex color code of the embed
    timestamp:          True or False - If you want a timestamp at the bottom of your embed or not
    footer_image:       The url of the image in the footer
    footer:             The footer text
    thumbnail:          The url of the thubmnail image
    image:              The url of the main image
    author:             The name of the author
    author_url:         The url clicking the authors name send you to
    author_icon:        The url of the author's icon
```

### Edit Embed
to edit embed use `$D` insted of `$E` and put `message:` parameter and give it embed message id
```
$D
message: 1018191839779635211
title: Hello !!!!
```
#### Easy way
add if your last embed is that you want to edit you can just edit your last message

The title should be enclosed in double quotes and there needs to be a `#` infront of the color code

Here's an example:

```
$E
title: My cool title
description: Cool embeds
Wow! Multiline
url: https://discordapp.com
color: #1243ff
timestamp: true
footer_image: https://cdn.discordapp.com/embed/avatars/0.png
footer: WOW! Footers!
thumbnail: https://cdn.discordapp.com/embed/avatars/0.png
image: https://cdn.discordapp.com/embed/avatars/0.png
author: ABCD
author_url: https://discordapp.com
author_icon: https://cdn.discordapp.com/embed/avatars/0.png
```

## How do I do multiline embeds?

The same way you do it normally with `Shift + Enter`.
