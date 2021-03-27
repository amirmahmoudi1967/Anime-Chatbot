const patternDict=
[
	{
    pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'Hello',
},
{
    pattern:'\\b(Bye|Exit)\\b',
    intent: 'Exit',
},
{
    pattern:'\\bCould\\s+you\\s+recommend\\s+me\\s+animes\\s+from\\s+the\\s+season\\s+(?<season>.+?(?=))\\s+in\\s+(?<year>(?<=).*$)',
    intent:'Season'
},
{
    pattern:'\\bGive\\s+me\\s+information\\s+about\\s+(?<anime>(?<=).*$)',
    intent:'Search',
},
{
    pattern:'\\bGive\\s+me\\s+the\\s+greatest\\s+anime\\s+of\\s+all\\s+time',  
    intent:'Top',
},
{
    pattern:'\\bCan\\s+I\\s+have\\s+the\\s+animes\\s+launching\\s+on\\s+(?<day>(?<=).*$)',
    intent:'Schedule',
},
{
    pattern:'\\bWhat\\s+are\\s+the\\s+anime\\s+launching\\s+next\\s+season',  
    intent:'Later',
},
{
    pattern:'\\bGive\\s+me\\s+the\\s+meta\\s+for\\s+(?<type>.+?(?=))\\s+(?<period>(?<=).*$)',
    intent:'Meta',
    //type             e.g. anime, manga, characters, people, search, top, schedule, season
    //period           e.g. today, weekly monthly
},
{
    pattern:'\\bPlease\\s+add\\s+this\\s+anime\\s+to\\s+my\\s+watchlist\\s+(?<anime_name>.+?(?=))\\s+my\\s+rating\\s+is\\s+(?<rating>(?<=).*$)',  
    intent:'Add Anime',
},
{
    pattern:'\\bPlease\\s+recommend\\s+me\\s+(?<number_recommandation>.+?(?=))\\s+animes',  
    intent:'Recommandation',
}
];
module.exports = patternDict;
