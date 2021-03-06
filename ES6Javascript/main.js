/*
 Altitude by Pixelarity
 pixelarity.com | hello@pixelarity.com
 License: pixelarity.com/license
 */

var settings = {
  
  slider: {
    
    // Transition speed (in ms)
    // For timing purposes only. It *must* match the transition speed of
    // ".slider > article".
    speed: 4000,
    
    // Transition delay (in ms)
    delay: 4000,
    
  },
  
  carousel: {
    
    // Transition speed (in ms)
    // For timing purposes only. It *must* match the transition speed of
    // ".carousel > article".
    speed: 100, width: 0, height: 0, videoWidth: 0, videoHeight: 0,
    
  },
  
};

class Feedback{
  constructor(){
    
    this.feedback = [
      "My Team Lead is awesome as always!",
      "I wish I could give Jeremiah more" + " stars.", "he's 10/10brink",
      "What more can be said that has not been" +
      " stated already. Fantastic TL. Incredible grasp on the material and" +
      " willingness to help. Made Lambda special.",
      " I only have good things to" +
      " say about Jeremiah. He is awesome and knowledgeable as always.",
      "Awesome as always!",
      "Most reliable TL there is. If you need to debug, he would be the one I" +
      " would turn to.", "Jeremiah keeps it legit in our TL group",
      "We've been" +
      " having just the best time these past few weeks I tell ya",
      "My TL" + " continues to be helpful and knowledgeable.",
      "Awesome! Thanks for the" + " continuous help and explanations.",
      "He's the best of the best.",
      "Solid" + " and excellent to work with as always",
      "Jeremiah continues to be" +
      " awesome. He is encouraging and understanding. He is also super" +
      " professional and knowledgeable. Someone should give him a job like asap" +
      " (but then I'll miss being in his group).",
      "Super accommodating, super" + " flexible. Glad to have around",
      "The more I hear from other students" +
      " about their experience with their TL the more I appreciate Jeremiah. He" +
      " is always professional and helpful. I am super glad to be in his group.",
      "When you want to quit, he won't let you. Great motivational TL",
      "Jeremiah's super helpful in finding bugs and leaning us in the right path.",
      "One on one peer programming with you has been a game changer for me.",
      "I'm really glad that I continue to be in Jeremiah's group. He is super" +
      " knowledgeable and helpful, and he gave an excellent demo during the" +
      " after hour session on Tuesday.", "I had a tough week personally, and" +
      " Jeremiah offered me additional support to help through a rough week",
      "My PM continues to be awesome and knowledgeable.. I had some issue with deploying the build week project and he helped me get that resolved. He also held a very resourceful after hour on Thursday.",
      "Keep up the good work! You've been more helpful than anyone else in this" +
      " program thus far.", "Jeremiah's is great as always. He seems to" +
      " understand so much of the technical aspects in React and ways to write" +
      " better/faster code. I imagine Jeremiah having his own business and" +
      " selling React classes he made.", "Jeremiah continuously helps our PM" +
      " group learn to better help one another. He lets those of us who" +
      " understand the material be navigators while someone is driving to debug" +
      " their code, and will help both sides learn to better lead and follow.",
      "What more can I say. Jeremiah is great! This week was pretty tough on most of us. He was willing to walk us through the material and help us understand the why. Someone get this guy a job already!",
      "As far as I am concerned, Jeremiah is the best PM Lambda School could" +
      " ever hope to have. He is extremely available, provides group sessions to" +
      " work through problems, and gives students the opportunity to explain solutions to other students before he gives his version of an answer. He promotes learning at all levels, and our PM group is closer to each other because of his style.",
      "My PM is always available and is always ready to help not just us but everyone in the class. He also gave us very useful feedback on the project assignments and during standup. On top of this, he gave great demos during the afterhour sessions.",
    ];
    
    this.element = document.querySelector( "#feedback-div" );
    this.pos = Math.ceil( Math.random() * this.feedback.length );
    this.element.textContent = this.feedback[ this.pos ];
    this.element.classList.add( "visible" );
    this.switchFeedback = this.switchFeedback.bind( this );
    this.interval = setInterval( this.switchFeedback, 5000 );
  }
  
  switchFeedback(){
    this.element.classList.remove( "visible" );
    
    setTimeout( () => {
      const prevPosition = this.pos;
      if( prevPosition === this.feedback.length - 1 ){
        this.pos = 0;
      }else{
        this.pos++;
      }
      this.element.textContent = this.feedback[ this.pos ];
      this.element.classList.add( "visible" );
    }, 1000 );
  }
}

const feedback = new Feedback();

class Carousel{
  constructor(){
    
    this.pos = 0;
    this.projects = [];
    this.locked = false;
    
    this.headingElement = document.getElementById( "main-heading" );
    this.p = document.getElementById( "main-p" );
    this.projectArticle = document.createElement( "article" );
    
    this.video = document.getElementById( "video" );
    this.nextButton = document.getElementById( "carousel_next" );
    this.prevButton = document.getElementById( "carousel_prev" );
    
    this.changeSlide = this.changeSlide.bind( this );
    this.addProject = this.addProject.bind( this );
    this.nextButton.addEventListener( "click", this.changeSlide );
    this.prevButton.addEventListener( "click", this.changeSlide );
  }
  
  changeSlide( e ){
    
    if( this.locked ){
      return;
    }
    
    this.locked = true;
    if( e.target.id === "carousel_prev" ){
      this.pos -= 1;
      if( this.pos < 0 ){
        this.pos = this.projects.length - 1;
      }
    }else{
      this.pos += 1;
      if( this.pos > this.projects.length - 1 ){
        this.pos = 0;
      }
      
    }
    
    this.projectArticle.classList.remove( "visible" );
    
    window.setTimeout( () => {
      this.projects[ this.pos ].setVisible( this.video,
        this.headingElement,
        this.p,
      );
      this.projectArticle.classList.add( "visible" );
      this.locked = false;
    }, settings.carousel.speed );
    
  };
  
  addProject( project ){
    
    if( this.projects.length === 0 ){
      window.setTimeout( () => {
        project.setVisible( this.video, this.headingElement, this.p );
      }, settings.carousel.speed );
    }
    this.projects.push( project );
  };
  
}

class Project{
  constructor( name, title, content, articles, videoUrl, demoUrl = "#",
    githubUrl = "#", listItems = [] ){
    
    this.name = name;
    this.title = title;
    this.content = content;
    this.articles = articles;
    this.videoUrl = videoUrl;
    this.demoUrl = demoUrl;
    this.githubUrl = githubUrl;
    this.listItems = listItems;
    this.setVisible = this.setVisible.bind( this );
    this.setWidthAndHeight = this.setWidthAndHeight.bind( this );
    this.setLiItems = this.setLiItems.bind( this );
  }
  
  setVisible( video, headingElement, p ){
    
    const width = Math.max( document.documentElement.clientWidth,
      window.innerWidth || 0,
    );
    const height = Math.max( document.documentElement.clientHeight,
      window.innerHeight || 0,
    );
    if( width !== settings.carousel.width || height !==
      settings.carousel.height ){
      this.setWidthAndHeight( height, width );
    }
    debugger
    video.pause();
    video.firstElementChild.setAttribute( "src", this.videoUrl );
    
    video.width = settings.carousel.videoWidth;
    video.height = settings.carousel.videoHeight;
    headingElement.textContent = this.title;
    
    if( video.paused ){
      video.load();
      video.play();
    }
    p.textContent = this.content;
    this.setLiItems();
    this.articles.forEach( ( article ) => {
      article.setActive( this.demoUrl, this.githubUrl );
    } );
  }
  
  setLiItems(){
    
    const ul = document.querySelector( "#list-items" );
    if( ul.hasChildNodes() ){
      let child = ul.firstChild;
      let next = null;
      do{
        next = child.nextSibling;
        ul.removeChild( ( child ) );
        child = next;
      }while( child );
    }
    
    this.listItems.forEach( li => {
      const item = document.createElement( "li" );
      item.textContent = li;
      ul.appendChild( item );
    } );
  }
  
  setWidthAndHeight( height, width ){
    debugger;
    if( width > 1000 && height > 500 ){
      settings.carousel.videoWidth = 560 * 1.25;
      settings.carousel.videoHeight = 350 * 1.25;
    }else if( width > 700 && height > 400 ){
      settings.carousel.videoWidth = 560;
      settings.carousel.videoHeight = 350;
    }else{
      settings.carousel.videoWidth = 560 * .5;
      settings.carousel.videoHeight = 350 * .5;
    }
  };
}

class Article{
  constructor( name, content, img, articleNumber ){
    this.articleNumber = articleNumber;
    this.heading = document.getElementById( `article${ articleNumber }-heading` );
    this.p = document.getElementById( `article${ articleNumber }-p` );
    this.link = document.getElementById( `article${ articleNumber }-link` );
    this.name = name;
    this.content = content;
    this.img = img;
    this.setActive = this.setActive.bind( this );
  }
  
  setActive( demoUrl, githubUrl ){
    this.heading.textContent = this.name;
    this.p.textContent = this.content;
    this.img.setActive();
    if( this.articleNumber === 1 ){
      this.link.setAttribute( "href", demoUrl );
    }else{
      this.link.setAttribute( "href", githubUrl );
      this.link.textContent = "Github Link";
    }
    
  }
}

class Img{
  constructor( src, alt, articleNumber ){
    this.imgElement = document.getElementById( `article${ articleNumber }-img` );
    this.src = src;
    this.alt = alt;
    this.setActive = this.setActive.bind( this );
  }
  
  setActive(){
    this.imgElement.setAttribute( "src", this.src );
    this.imgElement.setAttribute( "alt", this.alt );
  }
}

const voluntier = new Project( "VolunTier",
  "VolunTier",
  "How often do you volunteer? This is my Lambda Labs Project that " +
  "I and 6 others worked on over the 6 weeks long event. This application " +
  "helps solve the shortage of volunteers in our community by providing a " +
  "central location to advertise for volunteers and by encouraging people to " +
  "volunteer through gamification.",
  [
    new Article( "Firebase Api",
      "Google auth and firebase data storage.",
      new Img( "./assets/images/VoluntierLogin.JPG", "Google Auth Signin", 1 ),
      1,
    ), new Article( "Solid Team Atmosphere",
    "I became my team's TL in April. Which gave me the opportunity  to be" +
    " there for most of their journey. This made it feasible for me to gain" +
    " a  better perception of which members were skilled in the various" +
    " units  we covered. As a TL I was able to guide them through the tough" +
    "  aspects of their journey such as Ant Design and Styled  components" +
    " for styling. We were also able to cover Firebase for data storage  and" +
    " authentication, Moment.js to deal with time, and Axios to make http" +
    "  calls. This is the first time I got to work with a UX designer. The" +
    "  content that they were able to produce allowed us to focus more on" +
    "  the components and functionality rather than layouts of the project." +
    "  I feel we owe the majority of our success, to our team environment." +
    "  Each member was able to communicate and contribute equally throughout" +
    "  the duration of this project.",
    new Img( "./assets/images/VolunteerLanding.JPG",
      "VolunTier Platform Landing Page",
      2,
    ),
    2,
  ),
  ],
  "./assets/videos/VolunTier.mp4",
  "https://voluntier-platform.netlify.com/login",
  "https://github.com/Lambda-School-Labs/volunteer-platform-fe",
  [
    "I played a crucial role in development because of my experience with" +
    " firebase ", "Assisted others in learning the no sql design and how to" +
    " work with the firebase api", " Produced 87 pull requests",
    "Developed the Organization dashboard", "Created organization, and" +
    " events reducers, and  logic to fetch and create events",
    "Built and implemented the logic to upload images to firebase storage" +
    " bucket",
  ],
);

const pmDashboard = new Project( "PM Dashboard",
  "PM Dashboard",
  "This is a demo of the PM Dashboard another Team Lead" +
  " (Maksim Vakarchuk) and I created while I was a Team Lead at Lambda School." +
  " I created it because Team Leads were spending almost an hour a day" +
  " trying to submit airtable reports. This web app helped solve this" +
  " problem by auto populating airtable report with prefilled data such as" +
  " student names for attendance and for one on one reports. Once I solved" +
  " this problem for Team Leads we spread the project out to" +
  " the student dashboard giving students the same functionality. ",
  [
    new Article( "Firebase Api",
      "Leveraged Google auth and firebase for authentication and" +
      " storing data.",
      new Img( "./assets/images/GoogleSignin.JPG", "Google Auth Signin", 1 ),
      1,
    ), new Article( "React",
    "We utilized React, React-Router, and Redux to build out frontend." +
    " The PM-Dashboard comes with various forms that are to be subbmited on" +
    " daily and weekly basis. Including daily attendance, end of day" +
    " retrospective, friday sprint forms, and daily one on one reports." +
    " For those that have access to the admin section also get access to" +
    " the course structure and links along with access to a list of all" +
    " students enrolled into the student dashboard.",
    new Img( "./assets/images/PMDashboard.JPG",
      "PM Dashboard main dashboard" + " view.",
      2,
    ),
    2,
  ),
  ],
  "./assets/videos/pmDashboard.mp4",
  "https://pm-dashboard-ls.netlify.com/start",
  "https://github.com/jeremiahtenbrink/web20",
);

const studentDashboard = new Project( "Student Dashboard",
  "Student Dashboard",
  "Student Dashboard is a web app that was extended from the PM Dashboard. " +
  "This Student Dashboard is linked to the PM Dashboard. It allows" +
  " students to input their Team Lead. Their Team Lead can then keep track" +
  " of the students attendance and the classes they have completed. Each" +
  " class has links to the Project for the lesson. As well as links to the" +
  " airtable report the student is to submit at the end of the day. ",
  [
    new Article( "Firebase Api",
      "Login is handled by firebase google auth api.",
      new Img( "./assets/images/StudentDashboardLogin.JPG",
        "Google Auth" + " Signin",
        1,
      ),
      1,
    ), new Article( "React",
    "This dashboard is created with React, React Redux, React Router and" +
    " many other libraries. It is linked to the PM Dashboard via the" +
    " firebase api. It subscribes to the students info so once the info" +
    " is updated by the Team Lead on the PM Dashboard it is" +
    " automatically updated on the student dashboard.",
    new Img( "./assets/images/StudentDashboardMain.JPG",
      "Student Dashboard Main",
      2,
    ),
    2,
  ),
  ],
  "./assets/videos/studentDashboard.mp4",
  "https://ls-student-dashboard.netlify.com",
  "https://github.com/jeremiahtenbrink/student-dashboard",
);

const carosel = new Carousel();
carosel.addProject( voluntier );
carosel.addProject( pmDashboard );
carosel.addProject( studentDashboard );

( function( $ ){
  
  var $window = $( window ), $body = $( "body" );
  
  /**
   * Custom slider for Altitude.
   * @return {jQuery} jQuery object.
   */
  $.fn._slider = function( options ){
    
    var $window = $( window ), $this = $( this );
    
    // Handle no/multiple elements.
    if( this.length == 0 ){
      return $this;
    }
    
    if( this.length > 1 ){
      
      for( var i = 0; i < this.length; i++ ){
        $( this[ i ] )._slider( options );
      }
      
      return $this;
      
    }
    
    // Vars.
    var current = 0, pos = 0, lastPos = 0, slides = [],
      $slides = $this.children( "article" ), intervalId, isLocked = false,
      i = 0;
    
    // Functions.
    $this._switchTo = function( x, stop ){
      
      // Handle lock.
      if( isLocked || pos == x ){
        return;
      }
      
      isLocked = true;
      
      // Stop?
      if( stop ){
        window.clearInterval( intervalId );
      }
      
      // Update positions.
      lastPos = pos;
      pos = x;
      
      // Hide last slide.
      slides[ lastPos ].removeClass( "top" );
      
      // Show new slide.
      slides[ pos ].addClass( "visible" ).addClass( "top" );
      
      // Finish hiding last slide after a short delay.
      window.setTimeout( function(){
        
        slides[ lastPos ].addClass( "instant" )
          .removeClass( "visible" );
        
        window.setTimeout( function(){
          
          slides[ lastPos ].removeClass( "instant" );
          isLocked = false;
          
        }, 100 );
        
      }, options.speed );
      
    };
    
    // Slides.
    $slides
      .each( function(){
        
        var $slide = $( this );
        
        // Add to slides.
        slides.push( $slide );
        
        i++;
        
      } );
    
    // Initial slide.
    slides[ pos ]
      .addClass( "visible" )
      .addClass( "top" );
    
    // Bail if we only have a single slide.
    if( slides.length == 1 ){
      return;
    }
    
    // Main loop.
    intervalId = window.setInterval( function(){
      
      // Increment.
      current++;
      
      if( current >= slides.length ){
        current = 0;
      }
      
      // Switch.
      $this._switchTo( current );
      
    }, options.delay );
    
  };
  
  // Breakpoints.
  breakpoints( {
    xlarge: [ "1281px", "1680px" ],
    large: [ "981px", "1280px" ],
    medium: [ "737px", "980px" ],
    small: [ "481px", "736px" ],
    xsmall: [ "361px", "480px" ],
    xxsmall: [ null, "360px" ],
  } );
  
  // Play initial animations on page load.
  $window.on( "load", function(){
    window.setTimeout( function(){
      $body.removeClass( "is-preload" );
    }, 100 );
  } );
  
  // Fix: Object-fit (pseudo) polyfill.
  if( !browser.canUse( "object-fit" ) ){
    $( "img[data-position]" ).each( function(){
      
      var $this = $( this ), $parent = $this.parent();
      
      // Apply img's src to parent.
      $parent
        .css( "background-image", "url(\"" + $this.attr( "src" ) + "\")" )
        .css( "background-size", "contain" )
        .css( "background-repeat", "no-repeat" )
        .css( "background-position", $this.data( "position" ) );
      
      // Hide img.
      $this
        .css( "opacity", "0" );
      
    } );
  }
  
  // Sliders.
  $( ".slider" )
    ._slider( settings.slider );
  
  // Menu.
  $( "#menu" )
    .append( "<a href=\"#menu\" class=\"close\"></a>" )
    .appendTo( $body )
    .panel( {
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      target: $body,
      visibleClass: "is-menu-visible",
      side: "right",
    } );
  
} )( jQuery );

