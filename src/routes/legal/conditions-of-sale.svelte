<script>
    import Card from "$lib/components/container/Card.svelte";
    import Line from "$lib/components/elements/geometry/Line.svelte";
    import Link from "$lib/components/elements/texts/Link.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import PageBottom from "$lib/components/space/PageBottom.svelte";
</script>

<Title text="General Conditions of Sale"/>

<span class="text-center">
    <Text header size="xl-auto">General Conditions of Sale</Text>
</span>

<div class="w-10/12 sm:w-11/12 mx-auto mt"><Card>
    <div class="flex flex-col gap-4">
        <Text size="small">Update : April 04 2022</Text>

        <Text>Every user is invited to read carefully the present General Conditions of Sale. By browsing the site and prior to any purchase, you agree to read and accept without reservation these provisions in their entirety. The present General Conditions of Sale may be updated at any time.</Text>
        
        <Line/>

        <Text size="large">Definitions</Text>
        <ul class="list-disc ml-8">
            <Text><li><span class="font-bold">The Tchoos</span> represents the self-employed <span class="font-bold">Camille Dugas</span>:</li></Text>
            <ul class="list-disc ml-8">
                <Text><li>Location: France, Europe</li></Text>
                <Text><li>E-Mail : contact@tchoo.pet</li></Text>
                <Text><li>SIRET n°881 460 679 00015</li></Text>
                <Text><li>VAT not applicable, art. 293 B of the CGI.</li></Text>
            </ul>
            <Text><li><span class="font-bold">website</span> represents our website at <Link href="https://tchoo.pet" target="external">https://tchoo.pet</Link></li></Text>
            <Text><li><span class="font-bold">application</span> represents our mobile application to download on the following links:</li></Text>
            <ul class="list-disc ml-8">
                <!-- TODO : set the good links -->
                <Text><li><Link href="https://play.google.com/store/apps/details?id=com.tchoo.pet" target="external">Play Store (Google)</Link></li></Text>
                <Text><li><Link href="https://apps.apple.com/us/app/tchoo-pet/id1498797554" target="external">App Store (Apple)</Link></li></Text>
            </ul>
            <Text><li><span class="font-bold">customer</span> means any person who places an order via the website <Link href="https://tchoo.pet" target="external">https://tchoo.pet</Link></li></Text>
            <Text><li><span class="font-bold">NFT</span> stands for Non-Fungible Token, which is a unique object that is not interchangeable.</li></Text>
            <Text><li><span class="font-bold">Terms and Conditions</span> or <span class="font-bold">T&Cs</span> means this document.</li></Text>
            <Text><li><span class="font-bold">Elrond</span> is the company that manages the blockchain and cryptocurrency (EGLD) used for our payments and services.</li></Text>
        </ul>

        <Line/>

        <Text size="large">Preamble</Text>
        <Text>These Terms and Conditions are entered into by The Tchoos. Any contribution or purchase made on our website is donated to The Tchoos. The website is provided by the development team. The website is hosted by HOSTMYSERVERS whose head office is located at 71 Rue Francis de Pressensé, 69100 Villeurbanne.</Text>

        <Text size="large">Object of the contract</Text>
        <Text>The purchase of a NFT through this website implies the customer's unreserved acceptance of these Terms and Conditions of Sale. The purpose of these Terms and Conditions of Sale is to set forth the contractual terms between The Tchoos and the customer, and the terms and conditions applicable to any purchase made on the site.</Text>

        <Text size="large">Terms and Conditions</Text>
        <Text>Payments on our website are payments for virtual items (NFT) contained in the purchase. This transaction is final and there is no refund. If you want a refund, that money will not be refunded. If The Tchoos is no longer in operation, the virtual items will still be usable by the customer. All items are virtual and have a monetary value.</Text>

        <Text size="large">Commands</Text>
        <Text>The customer places an order on the website. Any order can only be made when the customer has registered on the website. The customer is obliged to use the Elrond services to make his purchases.</Text>

        <Text size="large">Prices</Text>
        <Text>The Tchoos reserves the right to change its prices at any time. Nevertheless, the price that will be displayed on the day of the purchase will be the only one applicable to the customer, they will be made in cryptocurrencies so the fees (defined by Elrond) will be displayed and paid by the customer.</Text>

        <Text size="large">Terms of payment</Text>
        <Text>Only one payment method can be used on the website. Any purchase implies the acceptance of the General Terms and Conditions of Sale of <Link href="https://elrond.com" target="external">https://elrond.com</Link></Text>

        <Text size="large">Delivery</Text>
        <Text>The purchases on the website are automated, the customer receives his NFT directly on his Elrond wallet (within a time which will be fixed by the speed of his transaction on the Elrond network). Nevertheless, you can contact us for any problem with the purchase of a NFT here: <Link href="mailto:contact@tchoo.pet" target="external">contact@tchoo.pet</Link></Text>

        <Text size="large">Withdrawal</Text>
        <Text>In accordance with Article L.121-20-2 of the French Consumer Code and given the nature of the service, the customer no longer has the right of withdrawal from the date and time the service is provided.</Text>

        <Text size="large">Terms of rembursement</Text>
        <Text>The NFT delivered are so-called intangible products and stored directly on the Elrond blockchain, given this fact no refund is possible once the order has been executed.</Text>

        <Line/>

        <Text size="large">Rights</Text>
        <Text>This contract is subject to French law.</Text>
    </div>
</Card></div>

<PageBottom/>