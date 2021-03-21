import React, { useState } from "react";

import { createUseStyles } from "react-jss";

import Navbar from "./Navbar";

const useStyles = createUseStyles({
  page: {
    background: "#1d1d1df9",
    color: "#FFF",
    width: "100vw",
    height: "100vh",

    overflowY: "auto",
  },
  main: {
    width: "100vw",

    display: "flex",
    justifyContent: "center",
  },
  body: {
    width: "100vw",
    maxWidth: "800px",
    margin: "30px",

    lineHeight: 1.5,

    fontSize: "15px",

    "& h1": {
      fontSize: "24px",
      fontWeight: "bold",
    },
    "& h2": {
      paddingTop: "100px",
    },
    "& a": {
      color: "#48F",
    },
  },
});
export const About = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Navbar></Navbar>
      <div className={classes.main}>
        <div className={classes.body}>
          <h1>About</h1>
          <p>
            Remapping Comanchería is a web application I have developed for use
            in the classroom as an interactive tool for teaching the history of
            the American Southwest and historical thinking skills, formulated as
            a direct response to the treatment of Indigenous peoples in the
            College Board’s Advanced Placement United States History (APUSH)
            framework, as well as cartographic misrepresentation as a tool of
            power more broadly.{" "}
          </p>
          <p>
            In the interest of making this project transparent, accessible, and
            reusable, I have included this page to answer common questions and
            open channels for feedback. If your questions are not answered here,
            or you are hoping to use Remapping Comanchería, feel free to e-mail
            me at{" "}
            <a href="mailto:madeleine.jeanette.hill@gmail.com">
              madeleine.jeanette.hill@gmail.com
            </a>
            .
          </p>
          <h1>FAQs</h1>

          <p>
            <a href="#1">How do I propose changes?</a>
          </p>
          <p>
            <a href="#2">Should I read through all at once?</a>
          </p>
          <p>
            <a href="#3">Where should I start?</a>
          </p>
          <p>
            <a href="#4">How does Remapping Comanchería fit in with APUSH?</a>
          </p>
          <p>
            <a href="#5">How was Remapping Comanchería developed?</a>
          </p>
          <p>
            <a href="#6">
              How does Remapping Comanchería center Indigenous voices?
            </a>
          </p>
          <p>
            <a href="#7">Where can I read more?</a>
          </p>

          <ul>
            <li>
              <a name="1" target="_self"></a>
              <h2>How do I propose changes?</h2>
              <p>
                I'm glad you asked! Remapping Comanchería was specifically
                developed with collaboration in mind. If you have specific edits
                in mind, you can propose these all from within the Github web
                interface, using the following instructions.
                <br />
                <br />
                <ol>
                  <li>
                    Navigate to the{" "}
                    <a
                      href="https://github.com/madeleinehill/remapping-comancheria"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Githhub repository
                    </a>{" "}
                    for Remapping Comanchería
                  </li>{" "}
                  <li>
                    Find the file(s) you wish to edit. If you are interested in
                    the main content (i.e. written on cards/modals), these will
                    be in /public/lessons.
                  </li>
                  <li>
                    When you can see the text you wish to edit, click the pencil
                    icon in the top right. This will create a "fork" - a
                    temporary version of the code that will hold your changes
                    until they can be incorporated into the main application.
                  </li>
                  <li>
                    When you are done editing, save your changes and create a
                    pull request using{" "}
                    <a
                      href="https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork"
                      target="_blank"
                      rel="noreferrer"
                    >
                      these instructions
                    </a>
                    . Be sure to explain why your changes improve the project
                    and include citations if relevant.
                  </li>
                </ol>{" "}
              </p>
            </li>

            <li>
              <a name="2" target="_self"></a>
              <h2>Should I read through all at once?</h2>
              <p>
                No! Remapping Comanchería is long - each section is estimated to
                require at least 30 minutes of engagement time if you are
                critically reading through the content. Science shows us that we
                learn best when we spread out our learning over time - even if
                it's just going for a walk in between lessons (though preferably
                you can engage over a number of days), spacing out the lessons
                will give you more time to internalize the content and skills,
                improving retention and increasing the value you get from
                practicing historical thinking.
              </p>
            </li>
            <li>
              <a name="3" target="_self"></a>
              <h2>Where should I start?</h2>
              <p>
                With the Introduction! Though each lesson and slide can be
                linked and accessed independently, the lessons build on each
                other. Without the context of previous sections, you're likely
                to be unfamiliar with facts and concepts introduced in previous
                sections, which are regularly referenced as points for
                comparison and argument. Reading sequentially will allow you to
                take full advantage of the learning progression embedded in
                Remapping Comanchería and will improve your overall experience.
              </p>
            </li>
            <li>
              <a name="4"></a>
              <h2>How does Remapping Comanchería fit in with APUSH?</h2>
              <p>
                The APUSH framework is built around two essential components:
                historical thinking skills, and course content. Remapping
                Comanchería is specifically developed to teach and reinforce the
                kind of critical thinking skills necessary to be successful on
                the AP Exam. Some of these skills come directly from the
                framework, such as causation, change over time,
                contextualization, and working with arguments. Others provide a
                complementary set of skills which are nonetheless central to
                critical reasoning about US history.
              </p>
              <p>
                In order to teach these skills, students will be asked to
                respond to engagement prompts. If you are in a classroom setting
                and have the opportunity, this is an excellent opportunity to
                discuss these questions to better understand and practice the
                reasoning processes at play.
              </p>
              <p>
                Remapping Comanchería reinforces a general factual understanding
                of US expansionism. Naturally, the history has a significant
                amount of overlap with APUSH course content, but it also deepens
                students' engagement with this content by reframing it in
                unfamiliar ways. Students will, for example, gain an enhanced
                understanding of Indian Removal policies, the expansion of
                slavery in the south, and the historical context which prompted
                the Mexican-American War and Civil War.
              </p>
              <p>
                Students will also be exposed to a number of primary and
                secondary sources, learning not only how historical peoples
                thought of themselves, but also how historians have conceived of
                them since. Working with these sources will provide an
                opportunity to exercise historical thinking skills, as well as
                practice engaging with the evidence and argument.
              </p>
              <p>
                In addition to this, Remapping Comanchería deliberately targets
                three key themes of the APUSH framework:
              </p>
              <p style={{ margin: "15px 50px" }}>
                <em>Migration and Settlement</em>
              </p>
              <p style={{ margin: "15px 50px" }}>
                This theme focuses on why and how the various people who moved
                to and within the United States both adapted to and transformed
                their new social and physical environments.
              </p>
              <p>
                By examining the historical realities of settlement on the
                American frontier, section 2, The Frontier, considers how
                migration of Mexicans, Anglo-Americans and Indigenous peoples
                alike would come to define much of the 19th century in North
                America.
              </p>
              <p style={{ margin: "15px 50px" }}>
                <em>American and National Identity</em>
              </p>
              <p style={{ margin: "15px 50px" }}>
                This focuses on how and why definitions of American and national
                identity and values have developed among the diverse and
                changing population of North America as well as on related
                topics, such as citizenship, constitutionalism, foreign policy,
                assimilation, and American exceptionalism.
              </p>
              <p>
                Arguably, nowhere is the concept of American identity more
                thoroughly tested and challenged than in the Southwest
                borderlands. By examining how national identity was conceived of
                on the frontier in historical times, as well as how the frontier
                myth has continued to shape American identity into the present,
                section 3, Los Comanches, explores how identity can be nuanced
                and multifaceted, as well as considering different conceptions
                of American identity.
              </p>
              <p style={{ margin: "15px 50px" }}>
                <em>Geography and the Environment</em>
              </p>
              <p style={{ margin: "15px 50px" }}>
                This theme focuses on the role of geography and both the natural
                and human-made environments in the social and political
                developments in what would become the United States.
              </p>
              <p>
                Geography and ecology in the Southwest and Plains help explain
                much of the Comanches’ power, but also guided long term
                processes that guided US expansion more broadly. In section 4,
                Remapping, we explore how the geography of North America
                consistently defined the course of history for both Indigenous
                peoples and Anglo-Americans.
              </p>
            </li>
            <li>
              <a name="5"></a>
              <h2>How was Remapping Comanchería developed?</h2>
              <p>
                I wrote much of the code for the application myself, as I found
                tools like StoryMap ill suited for the difficult task of
                bringing together a diverse set of resources to adequately treat
                the complexities of Indigenous history. You can find the Github
                repository{" "}
                <a
                  href="https://github.com/madeleinehill/remapping-comancheria"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
                .
              </p>
              <p>
                The application is written mostly in React, but uses a custom
                JSON schema to represent application data separately. This also
                allows for code-splitting, decreasing the intial render time and
                allowing resources like map data to load in the background while
                the user interacts with the application. This is supported by a
                set of asynchronous Sagas, which are stored in
                /src/modules/sagas.js.{" "}
              </p>
              <p>
                One of the technologies used is Leaflet-Fuzzy, a package I
                developed to allow for spatially ambiguous data to be
                represented in Leaflet maps. This is especially useful for
                inherently imprecise entities like the Ohio country in the 18th
                century, but also for entities where we (meaning I) lack the
                data or knowledge to precisely replicate borders which at one
                time existed. You can find that project{" "}
                <a
                  href="https://github.com/madeleinehill/leaflet-fuzzy"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                if you are interested.
              </p>
              <p>
                I used a number of tools to create and secure geographical
                resources for the project. The translucent historical map
                overlays come from the excellent{" "}
                <a
                  href="https://mapwarper.net/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Map Warper
                </a>
                , which allows users to upload and georeference their own image
                files and providing hosting for map tiles. Much of the
                Indigenous geographical data comes directly from{" "}
                <a
                  href="https://native-land.ca/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Native Land
                </a>
                , a Canadian not-for-profit organization which seeks to better
                represent Indigenous peoples' place in history. Finally, I
                created some resources for myself based on other maps or textual
                sources using{" "}
                <a href="https://geojson.io/" target="_blank" rel="noreferrer">
                  geojson.io
                </a>
                . Because leaflet-fuzzy offers support for most geojson shapes,
                data created here can be directly imported into the application.
              </p>
            </li>
            <li>
              <a name="6"></a>
              <h2>How does Remapping Comanchería center Indigenous voices?</h2>
              <p>
                In addition to engaging with the works of several Indigenous
                authors and projects throughout the development process, I
                worked to foreground the ideas produced by Indigenous
                individuals and organizations. For example, the Five Myths are
                based directly on the National Museum of the American Indian's{" "}
                <a
                  href="https://americanindian.si.edu/nk360/about/understandings"
                  target="_blank"
                  rel="noreferrer"
                >
                  essential understandings
                </a>
                . While they have been modified to better suit the purposes and
                audience of Remapping Comanchería, this allows for the direct
                use of Indigenous knowledge, targeting concepts which Indigenous
                people themselves have identified and articulated
              </p>
              <p>
                The use of data from{" "}
                <a
                  href="https://native-land.ca/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Native Land
                </a>{" "}
                serves a similar purpose, allowing for Indigenous peoples to
                represent their history, geographically, on their own terms. By
                incorporating these forms of Indigenous knowledge directly into
                my application, I have worked to ground my work in the lived
                experience of those groups.
              </p>
            </li>
            <li>
              <a name="7"></a>
              <h2>Where can I read more?</h2>
              <p>
                I have included a comprehensive list of references for each
                section, citing the works that I used to create the project. I
                also provide dedicated slides for further reading which are more
                similar to the project in scope, topic, or audience.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
