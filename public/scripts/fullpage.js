 // fullpage js
 new fullpage('#fullpage', {
    licenseKey: 'E5C049BC-0EA74FC2-B5EF5AD2-B3915038',
    //options here
    autoScrolling:true,
    navigation: true,
    slidesNavigation: true,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    verticalCentered: true,
    navigationTooltips: ['Home', 'About', 'Recent Work', 'Skills', 'Contact'],
    fixedElements: ['#modalMessageConfirmation'],
    scrollOverflow:true,
    scrollOverflowOptions: {
        click: false,
        preventDefaultException: { tagName:/.*/ }
    },

    onLeave: (origin, destination, direction) => {
        if (destination.anchor === "contact") {
            document.querySelector('.grecaptcha-badge').style.visibility = "visible";
        } else if (origin.anchor === "contact") {
            document.querySelector('.grecaptcha-badge').style.visibility = "hidden";
        }
    }
});

//methods
fullpage_api.setAllowScrolling(true);  