"use strict";

/// testing using GraphQL.js ////////

// const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
// const EasyGraphQLTester = require("easygraphql-tester");

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "RootQueryType",
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return "world";
//         }
//       }
//     }
//   })
// });

// const tester = new EasyGraphQLTester(schema);

/// testing using GraphQL.js ////////

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const EasyGraphQLTester = require("easygraphql-tester");

const schemaCode = fs.readFileSync(
  path.join(__dirname, "schema", "schema.js"),
  "utf8"
);

describe("Test my schema, Query", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  describe("Queries", () => {
    test("Should pass with multiples queries", () => {
      const query = `
        query trialQuery($repo: String!, $count: Int, $orderBy: IssueOrder) {
          viewer {
            name
            isHireable
            repository(name: $repo) {
              issues(first: $count, orderBy: $orderBy) {
                pageInfo {
                  hasPreviousPage
                  hasNextPage
                  startCursor
                  endCursor
                }
                totalCount
                edges {
                  node {
                    id
                    title
                    viewerDidAuthor
                    state
                  }
                }
              }
            }
          }
          licenses {
            name
          }
        }
      `;
      tester.test(true, query, {
        repo: "easygraphql"
      });
    });

    test("Should fail with multiples queries and a extra variable", () => {
      let error;
      try {
        const query = `
        query trialQuery($repo: String!, $count: Int, $orderBy: IssueOrder, $repoName: String!) {
          viewer {
            name
            isHireable
            repository(name: $repo) {
              issues(first: $count, orderBy: $orderBy) {
                pageInfo {
                  hasPreviousPage
                  hasNextPage
                  startCursor
                  endCursor
                }
              }
            }
          }
          licenses {
            name
          }
        }
      `;
        tester.mock({
          query,
          variables: {
            repo: "easygraphql",
            repoName: "easygraphql"
          }
        });
      } catch (err) {
        error = err;
      }

      expect(error).to.exist;
      expect(error.message).to.be.eq(
        'Variable "$repoName" is never used in operation "trialQuery".'
      );
    });

    test("Should pass with fragments", () => {
      const query = `
      query appQuery($count: Int, $cursor: String, $orderBy: IssueOrder) {
        viewer {
          ...issues_viewer
        }
      }

      fragment issues_viewer on User
        @argumentDefinitions(
          count: {type: "Int", defaultValue: 10}
          cursor: {type: "String"}
          orderBy: {
            type: "IssueOrder"
            defaultValue: {field: CREATED_AT, direction: DESC}
          }
        ) {
        issues(first: $count, after: $cursor, orderBy: $orderBy)
          @connection(key: "viewer_issues") {
          edges {
            node {
              ...issuesNode @relay(mask: false)
            }
          }
        }
      }

      fragment issuesNode on Issue @relay(mask: false) {
        id
        title
        repository {
          name
        }
        viewerDidAuthor
        state
      }
    `;

      tester.test(true, query);
    });
  });
});
