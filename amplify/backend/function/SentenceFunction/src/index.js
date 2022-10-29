/* Amplify Params - DO NOT EDIT
	API_FUN2LEARN_GRAPHQLAPIENDPOINTOUTPUT
	API_FUN2LEARN_GRAPHQLAPIIDOUTPUT
	API_FUN2LEARN_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_FUN2LEARN_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_FUN2LEARN_GRAPHQLAPIKEYOUTPUT;

const listSentences = /* GraphQL */ `
  query ListSentences(
    $filter: ModelSentencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSentences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pinyin
        english
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listCharacters = /* GraphQL */ `
  query ListCharacters(
    $filter: ModelCharactersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        simplified
        pinyin
        english
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    /** @type {import('node-fetch').RequestInit} */
    const optionsS = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY
        },
        body: JSON.stringify({ query: listSentences })
    };
    
    const optionsC = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY
        },
        body: JSON.stringify({ query: listCharacters })
    };

    const requestS = new Request(GRAPHQL_ENDPOINT, optionsS);
    const requestC = new Request(GRAPHQL_ENDPOINT, optionsC);

    let statusCode = 200;
    let body;
    let responseS;
    let responseC;
    let characters;
    let transformedSentences = [];

    try {
        responseC = await fetch(requestC)
        responseS = await fetch(requestS);
        characters = await responseC.json();
        body = await responseS.json();

        if (body.errors || characters.errors) statusCode = 400;
        else {
          // Create map between sentences and the individual characters
          body.data.listSentences.items.forEach((x) => {
            const pinyin = x.pinyin.toLowerCase().split(" ");
            const characterMap = pinyin.map((p) => {
              const stringHasPunc = p.match(/[.,/#!?$%^&*;:{}=\-_`~]/g);
        
              const character = (char) => {
                const found = characters.data.listCharacters.items.find((x) => x.pinyin.toLowerCase() === char.toLowerCase());
                if (found) {
                  return { string: found.simplified, isCharacter: true };
                } else {
                  return {
                    string: char,
                    isCharacter: false,
                  }
                }
              };
        
              let resolvedCharacters = [];
          
              if (stringHasPunc) {
                const puncIndex = p.indexOf(stringHasPunc);
                const separatedChars = [p.slice(0, puncIndex), p.slice(puncIndex)];
                separatedChars.forEach((x) => resolvedCharacters.push(character(x)));
              } else {
                resolvedCharacters.push(character(p));
              }
          
              return resolvedCharacters;
            });
  
            transformedSentences.push({
              simplified: characterMap.flatMap((x) => x),
              pinyin: x.pinyin,
              english: x.english,
            });
          });
        }
    } catch (error) {
        statusCode = 400;
        body = {
            errors: [
                {
                    status: responseS.status,
                    message: error.message,
                    stack: error.stack
                }
            ]
        };
    }

    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(transformedSentences),
    };
};
