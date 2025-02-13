<script>
// Be sure to load "<script src="https://player.vimeo.com/api/player.js"></script>" in the head too.

jQuery(document).ready(function($) {
    var buttonClicked = localStorage.getItem('popupShown') === 'true';

    // Find the Vimeo iframe with class 'elementor-video-iframe'
    var iframe = $('iframe.elementor-video-iframe');

    if (iframe.length > 0) {
        var player = new Vimeo.Player(iframe[0]);

        // Function to pause the Vimeo video
        function pauseVideo() {
            player.pause();
        }

        // Function to play the Vimeo video
        function playVideo() {
            player.play();
        }

        // Function to show the popup
        function showPopup() {
            if (!buttonClicked) {
                pauseVideo();
                elementorProFrontend.modules.popup.showPopup({
                    id: 406 // Replace with your actual popup ID
                });
            }
        }

        // Show the popup after the video has played for 15 seconds
        player.on('timeupdate', function(data) {
            if (!buttonClicked && data.seconds >= 15) {
                showPopup();
            }
        });

        // Handle the button click
        $(document).on('click', '#pass-button', function(event) {
            event.preventDefault();
            buttonClicked = true;
            localStorage.setItem('popupShown', 'true');
            elementorProFrontend.modules.popup.closePopup({}, event);
            playVideo();
        });

        // Prevent video from playing if popup is closed without button click
        $(document).on('click', '.elementor-popup-close', function(event) {
            if (!buttonClicked) {
                pauseVideo();
            }
        });

        // Prevent video from playing if user tries to manually play it without clicking the button
        player.on('play', function() {
            if (!buttonClicked) {
                setTimeout(function() {
                    if (!buttonClicked) {
                        showPopup();
                    }
                }, 15000); // 15 seconds
            }
        });
    }
});
</script>
