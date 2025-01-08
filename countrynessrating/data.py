# For bulk data processing to find the average number of country references per song
import requests
import json

songs = [
    { "artist": "Old Dominion", "title": "Memory Lane" },
    { "artist": "Morgan Wallen", "title": "Smile" },
    { "artist": "Dylan Scott", "title": "What He'll Never Have" },
    { "artist": "Riley Green", "title": "Worst Way" },
    { "artist": "Tyler Braden", "title": "Devil You Know" },
    { "artist": "Jordan Davis", "title": "I Ain't Sayin'" },
    { "artist": "Tucker Wetmore", "title": "Wind Up Missin' You" },
    { "artist": "Vincent Mason", "title": "Hell is a Dance Floor" },
    { "title": "Good News", "artist": "Shaboozey" },
    { "title": "Texas", "artist": "Blake Shelton" },
    { "title": "Ain't No Love In Oklahoma", "artist": "Luke Combs" },
    { "title": "A Bar Song (Tipsy)", "artist": "Shaboozey" },
    { "title": "Fix What You Didn't Break", "artist": "Nate Smith" },
    { "title": "Coming Home", "artist": "Old Dominion" },
    { "title": "Single Again", "artist": "Josh Ross" },
    { "title": "Park", "artist": "Tyler Hubbard" },
    { "title": "Love Somebody", "artist": "Morgan Wallen" },
    { "title": "Thought of You", "artist": "Sam Barber" },
    { "title": "I Never Lie", "artist": "Zach Top" },
    { "title": "High Road", "artist": "Zach Bryan" },
    { "title": "Should've Been A Cowboy", "artist": "Toby Keith" },
    { "title": "I'm in a Hurry (And Don't Know Why)", "artist": "Alabama" },
    { "title": "Something Like That", "artist": "Tim McGraw" },
    { "title": "Chattahoochee", "artist": "Alan Jackson" },
    { "title": "Write This Down", "artist": "George Strait" },
    { "title": "Amazed", "artist": "Lonestar" },
    { "title": "Just To See You Smile", "artist": "Tim McGraw" },
    { "title": "How Do You Like Me Now?!", "artist": "Toby Keith" },
    { "title": "One More Last Chance", "artist": "Vince Gill" },
    { "title": "Dust On The Bottle", "artist": "David Lee Murphy" },
    { "title": "Carrying Your Love With Me", "artist": "George Strait" },
    { "title": "Little Bitty", "artist": "Alan Jackson" },
    { "title": "Gone Country", "artist": "Alan Jackson" },
    { "title": "John Deere Green", "artist": "Joe Diffie" },
    { "title": "Straight Tequila Night", "artist": "John Anderson" },
    { "title": "Indian Outlaw", "artist": "Tim McGraw" },
    { "title": "Blue", "artist": "LeAnn Rimes" },
    { "title": "She's Got It All", "artist": "Kenny Chesney" },
    { "title": "Every Light In The House", "artist": "Trace Adkins" },
    { "title": "This Cowboy's Hat", "artist": "Chris LeDoux" },
    { "title": "I Can Still Make Cheyenne", "artist": "George Strait" },
    { "title": "Small Town Saturday Night", "artist": "Hal Ketchum" },
    { "title": "Wish I Didn't Know Now", "artist": "Toby Keith" },
    { "title": "Go Rest High On That Mountain", "artist": "Vince Gill" },
    { "title": "How Forever Feels", "artist": "Kenny Chesney" },
    { "title": "Be My Baby Tonight", "artist": "John Michael Montgomery" },
    { "title": "What's It To You", "artist": "Clay Walker" },
    { "title": "Blue Clear Sky", "artist": "George Strait" },
    { "title": "Bubba Shot The Jukebox", "artist": "Mark Chesnutt" },
    { "title": "If I Could Make a Living", "artist": "Clay Walker" },
    { "title": "Paint Me A Birmingham", "artist": "Tracy Lawrence" },
    { "title": "That Ain't My Truck", "artist": "Rhett Akins" },
    { "title": "You Ain't Much Fun", "artist": "Toby Keith" },
    { "title": "Brother Jukebox", "artist": "Mark Chesnutt" },
    { "title": "Bigger Than the Beatles", "artist": "Joe Diffie" },
    { "title": "I Left Something Turned On At Home", "artist": "Trace Adkins" },
    { "title": "In a Different Light", "artist": "Doug Stone" },
    { "title": "Bless The Broken Road", "artist": "Rascal Flatts" },
    { "title": "Chicken Fried", "artist": "Zac Brown Band" },
    { "title": "Live Like You Were Dying", "artist": "Tim McGraw" },
    { "title": "Somebody Like You", "artist": "Keith Urban" },
    { "title": "Toes", "artist": "Zac Brown Band" },
    { "title": "It's A Great Day To Be Alive", "artist": "Travis Tritt" },
    { "title": "She's Country", "artist": "Jason Aldean" },
    { "title": "Boondocks", "artist": "Little Big Town" },
    { "title": "Alright", "artist": "Darius Rucker" },
    { "title": "As Good As I Once Was", "artist": "Toby Keith" },
    { "title": "My Wish", "artist": "Rascal Flatts" },
    { "title": "I Love This Bar", "artist": "Toby Keith" },
    { "title": "Mud On the Tires", "artist": "Brad Paisley" },
    { "title": "Tequila Makes Her Clothes Fall Off", "artist": "Joe Nichols" },
    { "title": "I Go Back", "artist": "Kenny Chesney" },
    { "title": "I Wanna Talk About Me", "artist": "Toby Keith" },
    { "title": "Watching You", "artist": "Rodney Atkins" },
    { "title": "Austin", "artist": "Blake Shelton" },
    { "title": "Gettin' You Home", "artist": "Chris Young" },
    { "title": "Ol' Red", "artist": "Blake Shelton" },
    { "title": "Nothin' To Lose", "artist": "Josh Gracin" },
    { "title": "You'll Think Of Me", "artist": "Keith Urban" },
    { "title": "Redneck Yacht Club", "artist": "Craig Morgan" },
    { "title": "Long Black Train", "artist": "Josh Turner" },
    { "title": "Watching Airplanes", "artist": "Gary Allan" },
    { "title": "Some Beach", "artist": "Blake Shelton" },
    { "title": "Can't Fight The Moonlight", "artist": "LeAnn Rimes" },
    { "title": "Wasted", "artist": "Carrie Underwood" },
    { "title": "Brokenheartsville", "artist": "Joe Nichols" },
    { "title": "Bad Things", "artist": "Jace Everett" },
    { "title": "Last Name", "artist": "Carrie Underwood" },
    { "title": "Amarillo Sky", "artist": "Jason Aldean" },
    { "title": "Red Ragtop", "artist": "Tim McGraw" },
    { "title": "Do I", "artist": "Luke Bryan" },
    { "title": "These Are My People", "artist": "Rodney Atkins" },
    { "title": "Nothing On But The Radio", "artist": "Gary Allan" },
    { "title": "Making Memories Of Us", "artist": "Keith Urban" },
    { "title": "Where I Come From", "artist": "Alan Jackson" },
    { "title": "What Kinda Gone", "artist": "Chris Cagle" },
    { "title": "Hicktown", "artist": "Jason Aldean" },
    { "title": "Cowboy Casanova", "artist": "Carrie Underwood" },
    { "title": "It Must Be Love", "artist": "Alan Jackson" },
    { "title": "All My Friends Say", "artist": "Luke Bryan" },
    { "title": "Take Your Time", "artist": "Sam Hunt" },
    { "title": "Wagon Wheel", "artist": "Darius Rucker" },
    { "title": "Springsteen", "artist": "Eric Church" },
    { "title": "American Kids", "artist": "Kenny Chesney" },
    { "title": "Parachute", "artist": "Chris Stapleton" },
    { "title": "When It Rains It Pours", "artist": "Luke Combs" },
    { "title": "Homegrown", "artist": "Zac Brown Band" },
    { "title": "Play It Again", "artist": "Luke Bryan" },
    { "title": "Body Like A Back Road", "artist": "Sam Hunt" },
    { "title": "Beer Never Broke My Heart", "artist": "Luke Combs" },
    { "title": "Whiskey Glasses", "artist": "Morgan Wallen" },
    { "title": "Tennessee Whiskey", "artist": "Chris Stapleton" },
    { "title": "Country Girl (Shake It For Me)", "artist": "Luke Bryan" },
    { "title": "Barefoot Blue Jean Night", "artist": "Jake Owen" },
    { "title": "Stay A Little Longer", "artist": "Brothers Osborne" },
    { "title": "Hurricane", "artist": "Luke Combs" },
    { "title": "Head Over Boots", "artist": "Jon Pardi" },
    { "title": "Fire Away", "artist": "Chris Stapleton" },
    { "title": "Beautiful Crazy", "artist": "Luke Combs" },
    { "title": "Blue Ain't Your Color", "artist": "Keith Urban" },
    { "title": "Red Solo Cup", "artist": "Toby Keith" },
    { "title": "Why Don't We Just Dance", "artist": "Josh Turner" },
    { "title": "Drink In My Hand", "artist": "Eric Church" },
    { "title": "Blown Away", "artist": "Carrie Underwood" },
    { "title": "House Party", "artist": "Sam Hunt" },
    { "title": "She Got The Best of Me", "artist": "Luke Combs" },
    { "title": "Dirt On My Boots", "artist": "Jon Pardi" },
    { "title": "Drinkin' Problem", "artist": "Midland" },
    { "title": "Night Shift", "artist": "Jon Pardi" },
    { "title": "Chasin' You", "artist": "Morgan Wallen" },
    { "title": "Better Man", "artist": "Little Big Town" },
    { "title": "The Way I Talk", "artist": "Morgan Wallen" },
    { "title": "Written in the Sand", "artist": "Old Dominion" },
    { "title": "Sangria", "artist": "Blake Shelton" },
    { "title": "No Such Thing as a Broken Heart", "artist": "Old Dominion" },
    { "title": "Pontoon", "artist": "Little Big Town" },
    { "title": "Crazy Girl", "artist": "Eli Young Band" },
    { "title": "Rain Is A Good Thing", "artist": "Luke Bryan" },
    { "title": "Somethin' 'Bout A Truck", "artist": "Kip Moore" },
    { "title": "Wanted", "artist": "Hunter Hayes" },
    { "title": "Hotel Key", "artist": "Old Dominion" },
    { "title": "Long Hot Summer", "artist": "Keith Urban" },
    { "title": "Bartender", "artist": "Lady A" },
    { "title": "Get Along", "artist": "Kenny Chesney" },
    { "title": "Southern Nights", "artist": "Glen Campbell" },
    { "title": "Simple", "artist": "Florida Georgia Line" },
    { "title": "One Margarita", "artist": "Luke Bryan" },
    { "title": "All the Pretty Girls", "artist": "Kenny Chesney" },
    { "title": "Save It for a Rainy Day", "artist": "Kenny Chesney" },
    { "title": "Beers and Sunshine", "artist": "Darius Rucker" },
    { "title": "Same Boat", "artist": "Zac Brown Band" },
    { "title": "Make It Sweet", "artist": "Old Dominion" },
    { "title": "I Was On a Boat That Day", "artist": "Old Dominion" },
    { "title": "Southern State of Mind", "artist": "Darius Rucker" },
    { "title": "Overtime", "artist": "Zach Bryan" },
    { "title": "Sweet Home Alabama", "artist": "Lynyrd Skynyrd" },
    { "title": "I Should Have Married You", "artist": "Old Dominion" },
    { "title": "What My World Spins Around", "artist": "Jordan Davis" },
    { "title": "Almost Maybes", "artist": "Jordan Davis" },
    { "title": "Buy Dirt", "artist": "Jordan Davis" },
    { "title": "Last Night", "artist": "Morgan Wallen" },
    { "title": "No Hard Feelings", "artist": "Old Dominion" },
    { "title": "More Than My Hometown", "artist": "Morgan Wallen" },
]

totals = {}

def getLyrics(artist, title):
    resp = requests.get(f"https://api.lyrics.ovh/v1/{artist}/{title}")
    data = json.loads(resp.text)["lyrics"]
    lines = data.split("\n")
    
    return filter(lambda a: a != "", lines) 

def hasGod(lyric):
    keywords = [" god", "heaven", "pray", "church", "lord", "angel", "jesus", "amen", "hallelujah", "blessing"]

    for word in keywords:
        if word in lyric.lower():
            return True

    return False

def hasTown(lyric):
    keywords = ["small town", "dirt road", "small-town", "gravel", "red dirt", "down the street", "back road", "mud", "hometown"]

    for word in keywords:
        if word in lyric.lower():
            return True

    return False

def hasGirls(lyric):
    keywords = ["baby", "babe", "you and me", "me and you", "you and I", "you love", "your love", "love you", "loving you", "loved you", "loves you", "girl", "kiss", "dress", "heart", "body", "pretty", "get laid", "woman", "your face" "earrings", "beautiful"]

    for word in keywords:
        if word in lyric.lower():
            return True

    return False

def hasTrucks(lyric):
    keywords = ["flatbed", "truck", "chevy", "ford", "windshield", "wheel", "pickup", "pick-up", "tires", "pickup"]

    for word in keywords:
        if word in lyric.lower():
            return True

    return False

def hasAlcohol(lyric):
    keywords = [" bar", "drunk", "drink", "drank", "tipsy", "whiskey", "beer", "wine", "pour", "liquor", "buzz", "bourbon", "bottle", "tequila", "margarita", " rum"]

    for word in keywords:
        if word in lyric.lower():
            return True

    return False

def getReferences(song):
    references = { "god": 0, "town": 0, "girls": 0, "trucks": 0, "alcohol": 0, "lines": 0 };
    lyrics = list(getLyrics(song["artist"], song["title"]))

    references["lines"] = len(lyrics)

    for lyric in lyrics:
        if hasGod(lyric): 
            references["god"] += 1
        if hasTown(lyric): 
            references["town"] += 1
        if hasGirls(lyric): 
            references["girls"] += 1
        if hasTrucks(lyric): 
            references["trucks"] += 1
        if hasAlcohol(lyric): 
            references["alcohol"] += 1

    return references

for song in songs:
    print(f"processing {song['title']}")
    references = getReferences(song)

    if song["artist"] in totals:
        totals[song["artist"]]["god"] += references["god"]
        totals[song["artist"]]["town"] += references["town"]
        totals[song["artist"]]["girls"] += references["girls"]
        totals[song["artist"]]["trucks"] += references["trucks"]
        totals[song["artist"]]["alcohol"] += references["alcohol"]
        totals[song["artist"]]["lines"] += references["lines"]
    else:
        totals[song["artist"]] = references

print(totals)