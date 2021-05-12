# beam
We remember, so you can live in the moment.

### 2021 SF Hacks.
#### :star2: Best Mobile Hack
#### :star2: Best Use of Google Cloud
&nbsp;

## What it does
Beam is a mobile app that helps you build and maintain meaningful personal relationships with your friends, family, and colleagues. It allows you to track important details about your contacts, and it provides recommended sharable content (articles, playlists, news, etc) based on their profiles.
&nbsp;


## How it works
When recommending articles, Beam utilizes the News API to retrieve the latest articles based on a contact’s interests. From there, Beam determines the best article to suggest based on relevance. It then passes the news article to the SMMRY API, which summarizes the content of the article. Beam also uses The Movie Database API to provide suggestions of movies and TV shows.

For custom and uncategorized fields, Beam uses the Google Cloud Natural Language API to analyze the text fields and identify their structure and keywords. These keywords are then passed to the Google Knowledge Graph API to be categorized into entities. Once Beam understands the context of the input, it chooses the appropriate APIs to generate shareable content suggestions.
