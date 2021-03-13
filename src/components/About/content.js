const content = `
# About

Remapping Comanchería is a web application I have developed for 
use in the classroom as a multimedia tool for teaching the history 
of the American Southwest and historical thinking skills, formulated 
as a direct response to the treatment of Indigenous peoples in the 
College Board’s Advanced Placement United States History (APUSH) framework, 
as well as cartographic misrepresentation as a tool of power more broadly. 

In the interest of making this project transparent, accessible, and 
reusable, I have included this page to answer common questions and open
channels for feedback. If your questions are not answered here, or you
are hoping to use Remapping Comanchería, feel free to e-mail me at
<madeleine.jeanette.hill@gmail.com>.


# FAQs


* ## How do I propose changes?

> I'm glad you asked! Remapping Comanchería was specifically developed
with collaboration in mind. If you have specific edits in mind, you 
can propose these all from within the Github web interface, using the 
following instructions.

> 1. Navigate to the [Githhub repository](https://github.com/madeleinehill/remapping-comancheria) for Remapping Comanchería
> 1. Find the file(s) you wish to edit. If you are interested in the main content (i.e. written on cards/modals), these will be in /public/lessons. 
> 1. When you can see the text you wish to edit, click the pencil icon in the top right. This will create a fork that will hold your changes until you make a pull request.
> 1. When you are done editing, save your changes and create a pull request using [these instructions](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Be sure to explain why your changes improve the project and include citations if relevant.


* ## How does Remapping Comanchería fit in with APUSH?

> At a basic level, Remapping Comanchería reinforces a general factual 
understanding of US expansionism, and developing facility with the Five 
Cs of historical analysis. Moreover, by being exposed to challenges to
the APUSH framework and academic standards, students become more familiar
with those very standards, and are more likely to engage with them deeply
and critically.

> In addition to this, Remapping Comanchería deliberately targets three key
themes of the APUSH framework:

> >  _Migration and Settlement_ 

> > This theme focuses on why and how the various people who moved to and within the United States both adapted to and transformed their new social and physical environments.

> By examining the historical realities of settlement on the 
American frontier, section 2, The Frontier, considers how
migration of Mexicans, Anglo-Americans and Indigenous peoples 
alike defined much of the 19th century in North America.

> > _American and National Identity_

> > This focuses on how and why definitions of American and national identity and values have developed among the diverse and changing population of North America as well as on related topics, such as citizenship, constitutionalism, foreign policy, assimilation, and American exceptionalism.

> Arguably, nowhere is the concept of American identity more thoroughly 
tested and challenged than in the Southwest borderlands. By examining 
how American identity was conceived of on the frontier in historical 
times, as well as how the frontier myth has continued to shape American 
identity into the present, section 3, Los Comanches, explores how identity
can be nuanced and multifaceted, as well as considering different conceptions of 
American identity.


> > _Geography and the Environment_

> > This theme focuses on the role of geography and both the natural and human-made environments in the social and political developments in what would become the United States.

> Geography and ecology in the Southwest and Plains help explain much of 
the _Comanches_’ power, but also guided long term processes that guided
US expansion more broadly. In section 4, Remapping, we explore how the 
geography of North America consistently defined the course of history for
both Indigenous peoples and Anglo-Americans, from the Comanches' adoption
of a plains lifestyle to advocates of removal who sought the fertile soil 
of Mississippi and Alabama.

* ## How was Remapping Comanchería developed?

> I wrote much of the code for the application myself, as I found tools 
like StoryMap ill suited for the difficult task of bringing together
a diverse set of resources to adequately treat the complexities of 
Indigenous history. You can find the Github repository [here](https://github.com/madeleinehill/remapping-comancheria).

> The application is written mostly in React, but uses a custom JSON
schema to represent application data separately. This also allows for code-splitting,
decreasing the intial render time and allowing resources like map data
to load in the background while the user interacts with the application.
This is supported by a set of asynchronous Sagas, which are stored in
/src/modules/sagas.js. 

> One of the technologies used is Leaflet-Fuzzy, a package I developed to 
allow for spatially ambiguous data to be represented in Leaflet maps. 
This is especially useful for inherently imprecise entities like the Ohio 
country in the 18th century, but also for entities where we (meaning I)
lack the data or knowledge to precisely replicate borders which at 
one time existed. You can find that project [here](https://github.com/madeleinehill/leaflet-fuzzy)
if you are interested.

* ## Where can I read more?

> I have included a comprehensive list of references for each section, 
citing the works that I used to create the project. I also provide dedicated 
sections for further reading which are more similar to the project in scope, 
topic, or audience, but which I did not necessarily use myself.
`;

export default content;
