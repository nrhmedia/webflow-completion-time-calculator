$("[data-post-wrapper]").each(function () {
  let link = $(this).find("[data-post-link]").attr("href");
  let minutesText = $(this).find("[data-read-time]");
  $.ajax({
    url: link,
    success: function (response) {
      let cmsPage = $(response);
      let richTextElements = cmsPage.find('[count-me="true"]');
      const wordsPerMinute = 250;
      const secondsPerImage = 10;

      let totalWords = 0;
      let totalImages = 0;

      richTextElements.each(function () {
        totalWords += $(this).text().split(" ").length;
        totalImages += $(this).find("img").length;
      });

      const totalMinutes = Math.floor((totalWords / wordsPerMinute) + (totalImages * secondsPerImage / 60));
      const totalSeconds = (totalWords / wordsPerMinute) * 60 + (totalImages * secondsPerImage);

      if (totalSeconds < 60) {
        minutesText.text(`Less than 1 minute`);
      } else if (totalMinutes === 1) {
        minutesText.text(`1 minute`);
      } else {
        minutesText.text(`${totalMinutes} minutes`);
      }
    }
  });
});