import admin from "$lib/firebase/firebase.admin";

export async function GET({ url }: any) {

  try {
    const firestore = admin!.firestore();
    const search = url.searchParams.get('search')

    let query: any = firestore.collection('piro_current_account')
     if (search) query = query.where("data.attachment.orderId", "==", search)
    // query = query.where("data.TX", "==", search)
    query = query.orderBy('metadata.createdDate', 'desc')
    query = query.limit(100)

    const querySnapshot = await query.get();
    const transactions = querySnapshot.docs.map((doc: any) => {
      const transaction = doc.data()
      return transaction
    }
    );
    return new Response(JSON.stringify(transactions));
  } catch (error) {
    return new Response(JSON.stringify({}));
  }

}