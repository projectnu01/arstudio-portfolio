# How to Create a Video Playlist from a Google Drive Folder

This guide will help you create a **Smart Apps Script** that does two things:

1.  **Scans a specific Folder** on your Google Drive to find all video files.
2.  **Generates streaming links** for your website to play them one by one.

### Step 1: Get the Folder ID

1.  Go to **Google Drive**.
2.  Open the folder containing your videos (`VIDEOS`).
3.  Look at the URL bar. It looks like:
    `drive.google.com/drive/u/0/folders/1xII4TUaNcpR7grgSRG3gIJxcdlF0ZbWa`
4.  Copy the last part (the **Folder ID**): `1xII4TUaNcpR7grgSRG3gIJxcdlF0ZbWa`

### Step 2: Create the Smart Script

1.  Go to **[script.google.com](https://script.google.com/)**.
2.  Create a **New Project**. Name it "Portfolio Video Manager".
3.  **Delete everything** in `Code.gs` and paste this code:

```javascript
function doGet(e) {
  var folderId = e.parameter.folderId;
  var videoId = e.parameter.id;

  // CASE 1: Play a specific video (Streaming Mode)
  if (videoId) {
    try {
      var file = DriveApp.getFileById(videoId);
      file.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW,
      );
      var downloadUrl =
        "https://drive.google.com/uc?export=download&id=" + videoId;
      return ContentService.createTextOutput(downloadUrl);
    } catch (err) {
      return ContentService.createTextOutput("Error: " + err.message);
    }
  }

  // CASE 2: List all videos in a folder (Playlist Mode)
  if (folderId) {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var videoList = [];

    // Get the URL of this script itself to build streaming links
    var scriptUrl = ScriptApp.getService().getUrl();

    while (files.hasNext()) {
      var file = files.next();
      var mimeType = file.getMimeType();

      // Check if it is a video file
      if (mimeType.indexOf("video") !== -1) {
        videoList.push({
          title: file.getName().replace(/\.[^/.]+$/, ""), // Remove extension for clean title
          src: scriptUrl + "?id=" + file.getId(), // The link to play it
          desc: "Watch this highlight", // Default description
          type: mimeType,
        });
      }
    }

    // Return the list as JSON
    return ContentService.createTextOutput(
      JSON.stringify(videoList),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    "Welcome! Add ?folderId=YOUR_ID to list videos.",
  );
}
```

### Step 3: Deploy

1.  Click **Deploy** (blue button) > **New deployment**.
2.  Select **Web app**.
3.  **Execute as**: **Me**.
4.  **Who has access**: **Anyone** (Crucial!).
5.  Click **Deploy** (and Authorize permissions if asked).
6.  **Copy the Web App URL**.
    - Example: `https://script.google.com/macros/s/ABC123xyz.../exec`

### Step 4: Connect to Your Website

1.  Open your `index.html` file in VS Code.
2.  Find the video player section.
3.  Change the `src` attribute of the `<video>` tag to include your **Apps Script URL** + `&folderId=` + your **Folder ID**.
    - Wait! Since we need to _list_ them, we will update the **Javascript** instead.

    **I will handle the code update (Step 5) for you automatically in the next step.**

    **All you need to do is:**
    1.  Deploy the script above.
    2.  Get your **Script URL**.
    3.  Get your **Folder ID**.
