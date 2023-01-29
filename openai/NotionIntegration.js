require("dotenv").config({ path: "../.env" });
const data = require("./documentation/final.json");
const { Client } = require("@notionhq/client");
const Notion = new Client({
  auth: process.env.NOTION_DOCUMENTATION_KEY,
});

// createPage({
//   parent_id: "9ac4e16b-5d24-428a-a542-9ef54b898ad0",
//   body: {
//     title: "heya",
//   },
// });

async function createPage(props) {
  const { parent_id, body } = props;
  const { title, children, icon } = body;
  const response = await Notion.pages.create({
    parent: {
      type: "page_id",
      page_id: parent_id,
    },
    icon: {
      type: "emoji",
      emoji: icon,
    },
    properties: {
      title: {
        title: [
          {
            type: "text",
            text: {
              content: `${title}`,
            },
          },
        ],
      },
    },
    children: children,
  });
  //console.error(response.body);
  return response;
}

function Heading(text) {
  return {
    type: "heading_1",
    heading_1: {
      rich_text: [
        {
          type: "text",
          text: {
            content: text,
            link: null,
          },
        },
      ],
      color: "default",
      is_toggleable: false,
    },
  };
}

function Paragraph(text) {
  return {
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: text,
            link: null,
          },
        },
      ],
      color: "default",
    },
  };
}
async function traverse(jsonObj, parent_id) {
  if (jsonObj !== null && typeof jsonObj == "object") {
    for (const [key, value] of Object.entries(jsonObj)) {
      if (key.search("/") !== -1) {
        let parent = (
          await createPage({
            parent_id: parent_id,
            body: { title: key, icon: "📂" },
          })
        ).id;

        traverse(value, parent);
      } else if (key.search(".js") !== -1) {
        const Functions = [];
        Object.entries(value.functions).map(
          ([function_name, function_props]) => {
            if (function_props?.function === undefined) return;
            Functions.push(Heading(function_name));
            Functions.push(Paragraph(function_props.function));
          }
        );
        let children = [];
        if (value?.summary && typeof value.summary === "string") {
          children.push(Heading("Summary"));
          children.push(Paragraph(value.summary));
        }
        children.push(...Functions);
        console.log(value);
        await createPage({
          parent_id: parent_id,
          body: {
            title: key,
            children: children,
            icon: "📜",
          },
        });
      }
      // key is either an array index or object key
    }
  } else {
    // jsonObj is a number or string
  }
}
traverse(data, "9ac4e16b5d24428aa5429ef54b898ad0");
