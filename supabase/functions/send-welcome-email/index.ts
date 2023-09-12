const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const SENDGRID_ENDPOINT = Deno.env.get('SENDGRID_ENDPOINT')
const SENDGRID_SENDER_EMAIL = Deno.env.get('SENDGRID_SENDER_EMAIL')
const SENDGRID_SENDER_NAME = Deno.env.get('SENDGRID_SENDER_NAME')

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

serve(async (req: Request) => {
  try {
    const { email} = await req.json()

    const data = {
      personalizations: [
        {
          to: [
            {
              email: email
            }
          ],
          subject: 'Welcome!'
        }
      ],
      content: [
        {
          type: 'text/plain',
          value: 'Thanks for registering!'
        }
      ],
      from: {
        email: SENDGRID_SENDER_EMAIL,
        name: SENDGRID_SENDER_NAME
      }
    };

  const headers = {
    Authorization: `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json'
  };

  if(email && SENDGRID_ENDPOINT) {
    const response = await fetch(SENDGRID_ENDPOINT, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
    });
    if(!response.ok) throw Error("Could not send email")
    
  }
 
  return new Response(JSON.stringify({message: "Success", error: null}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  } catch (error) {

    return new Response(JSON.stringify({message: "Error", error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

 