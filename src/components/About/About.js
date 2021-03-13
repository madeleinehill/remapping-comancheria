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
            in the classroom as a multimedia tool for teaching the history of
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
            <a href="#2">How does Remapping Comanchería fit in with APUSH?</a>
          </p>
          <p>
            <a href="#3">How was Remapping Comanchería developed?</a>
          </p>
          <p>
            <a href="#4">Where can I read more?</a>
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
                    1. When you can see the text you wish to edit, click the
                    pencil icon in the top right. This will create a fork that
                    will hold your changes until you make a pull request.
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
              <a name="2"></a>
              <h2>How does Remapping Comanchería fit in with APUSH?</h2>

              <p>
                At a basic level, Remapping Comanchería reinforces a general
                factual understanding of US expansionism, and developing
                facility with the Five Cs of historical analysis. Moreover, by
                being exposed to challenges to the APUSH framework and academic
                standards, students become more familiar with those very
                standards, and are more likely to engage with them deeply and
                critically.
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
                alike defined much of the 19th century in North America.
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
                borderlands. By examining how American identity was conceived of
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
                much of the _Comanches_’ power, but also guided long term
                processes that guided US expansion more broadly. In section 4,
                Remapping, we explore how the geography of North America
                consistently defined the course of history for both Indigenous
                peoples and Anglo-Americans, from the Comanches' adoption of a
                plains lifestyle to advocates of removal who sought the fertile
                soil of Mississippi and Alabama.
              </p>
            </li>
            <li>
              <a name="3"></a>
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
                time existed. You can find that project
                [here](https://github.com/madeleinehill/leaflet-fuzzy) if you
                are interested.
              </p>
            </li>
            <li>
              <a name="4"></a>
              <h2>Where can I read more?</h2>
              <p>
                I have included a comprehensive list of references for each
                section, citing the works that I used to create the project. I
                also provide dedicated sections for further reading which are
                more similar to the project in scope, topic, or audience, but
                which I did not necessarily use myself.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
