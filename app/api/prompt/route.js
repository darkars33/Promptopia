import connectToDB from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req) =>{
          try {
                    await connectToDB();

                    const prompts = await Prompt.find({}).populate('creator').sort({createdAt: -1});
                    
                    return new Response(JSON.stringify(prompts), {status: 200});
          } catch (error) {
                    return new Response(JSON.stringify({msg: 'Something went wrong'}), {status: 500});
          }
}