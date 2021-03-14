# beam
We remember, so you can live in the moment.
### Best Mobile Hack and Best Use of Google Cloud awards at 2021 SF Hacks.

## What it does
Beam is an app that helps you build and maintain meaningful relationships with your friends, family, and colleagues. It allows you to track important details about your contacts and provides recommended sharable content (articles, playlists, news, etc) based on their contact's profile.

## How we built it
We started off by researching the problem space, building wireframes in Whimsical, and designing in Figma. From there, we implemented our designs into a mobile app created with React Native.

## How it works
When recommending articles, our application first utilizes the News API to retrieve the latest articles on a person’s interests. From there, we determine the best article to suggest based on relevance. Our app then passes the news article’s URL to SMMRY API, which we use to summarize the content of the article. Our application also uses The Movie Database API to provide suggestions of movies and tv shows based on conversations you’ve had with your contact about other shows previously watched.

For custom and uncategorized fields, our application uses the Google Cloud Natural Language API to analyze the text field and identify its structure and keywords. After that, these words are passed to the Google Knowledge Graph API to categorize the keywords into entities. Once our application understands the context of the words, we can then pass them to appropriate APIs to generate our suggestions.
