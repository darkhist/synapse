const handler = () => new Response("hello from the synapse API");

export const config = {
  runtime: "experimental-edge",
};

export default handler;
