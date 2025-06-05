# devlog
**3/20/25**

>so i'm pretty sure i've set up the basics right now. i still need to figure out how to set up the api's and stuff like that. i need to figure out how to get the frontend and the backend to interact with each other. after that i need to set up the react backend. i'm prob going to create a separate repository for the repository, or maybe i can combine it into this one idk how to do that i'l find out later.

**3/26/25**
>using this udemy course to learn more about react. i already know the basics of it but i want to be more adept.

**5/19/25**
>stopped watching the udemy course because it was too slow paced and will only refer to it when i need to learn something specific. i started working on this project like 2 or 3 days ago and forgot to use this devlog that i created two months ago. originally this repo was going to be used as a demo project until i learned everything and i was going to create a brand new repo for my actual project. but i decided i just want to dive straight in and create my MVP straight off the bat and just learn by doing. it's overwhelming but i'm enjoying the process. the whole point of this project is to create a marketplace that is restricted just for my university. my inspiration for this project came from a youtuber i watch online. but yeah i want to finish this project by the end of summer so that i can actually have something up and running. so far tho its pretty bare bones and the ui is horrible, i've already created the login page, home page, listings page, and i'm starting to work on the my listings page and the logic that runs behind it next coding sesh. but yeah i still almost have no idea what i'm doing but i guess i'll see where this thang takes me. 

**6/04/25**
>i stopped using css modules entirely and incorporated tailwind into my project just because it's faster to style and less of a headache to come up with class names. it took a little bit of work but because i already had vanilla css knowledge, it wasn't too difficult to switch to tailwind. i also incorporated react query (tanstack) to manage my ui and its state, because i learned it's better to use than the classic useState + useEffect. I actually enjoy this approach more because it's simple, and it comes with a lot of states to handle (e.g. isLoading, error, etc...), there are actually so many different options but these are the only ones i use tbh. at this point, the only features that i still need to implement are as follows:

    - user authentication (will most likely use 0Auth or JWT ... prob JWT because it's in the spring family)
    - a working create an account page (w/ validation)
    - a my profile page
    - a working search bar
    - working filters- for filtering out different listings (will have to include tags with each listing... will learn how to do this later)
    - figuring out how a user can upload different image types for their listings (.png, .jpg, etc...)
         - having a slide show of images for a listing, and allowing a user to have multiple images for their listing... not just one.
    - a modal that acts as validation and appears when a user's action isn't valid. For example: the listing name has too many characters, the description listing has too many characters, image file types aren't permitted, etc... (will be a reuseable component).

>for now i'm planning to host my project just to see it thrown out there. it should't take too long to learn. i've already planned on hosting the backend with render/railway and the frontend with vercel, so it should be easy to learn hopefully. like i said in my last update, i still have no idea what i'm doing but hopefully this all works out. i'm planning to complete this project. lowkey the ui rn looks like dogshi but its probably ok. i also learned that i should be writing documentation and testing for my code, but lowkey that's a lot of work so i'll just stick with my minimal documentation.