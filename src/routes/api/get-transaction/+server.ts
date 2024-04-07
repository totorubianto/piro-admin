import admin from "$lib/firebase/firebase.admin";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET(request:RequestEvent){
    const firestore = admin!.firestore();
    let query: any = firestore.collection('piro_current_account').limit(50)
    const querySnapshot = await query.get();
    const transactions = querySnapshot.docs.map((doc: any) => {
      const transaction = doc.data()
      return transaction
    }
    );
    console.log(transactions)
    return new Response(JSON.stringify(transactions));

}