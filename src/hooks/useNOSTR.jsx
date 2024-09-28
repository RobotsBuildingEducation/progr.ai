import { useState, useEffect } from "react";

import NDK, {
  NDKPrivateKeySigner,
  NDKKind,
  NDKEvent,
} from "@nostr-dev-kit/ndk";

import { Buffer } from "buffer";
import { bech32 } from "bech32";
import { getPublicKey, nip19 } from "nostr-tools";

export const useSharedNostr = (initialNpub, initialNsec) => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nostrPubKey, setNostrPubKey] = useState(initialNpub || "");
  const [nostrPrivKey, setNostrPrivKey] = useState(initialNsec || "");

  useEffect(() => {
    // Load keys from local storage if they exist
    const storedNpub = localStorage.getItem("local_npub");
    const storedNsec = localStorage.getItem("local_nsec");

    if (storedNpub) {
      setNostrPubKey(storedNpub);
    }

    if (storedNsec) {
      setNostrPrivKey(storedNsec);
    }
  }, []);

  const setProfilePicture = async (
    profilePictureUrl = "https://primal.b-cdn.net/media-cache?s=o&a=1&u=https%3A%2F%2Fm.primal.net%2FKBLq.png",
    npubRef,
    nsecRef
  ) => {
    const connection = await connectToNostr(npubRef, nsecRef);
    if (!connection) return;

    const { ndkInstance, hexNpub, signer } = connection;

    try {
      // Fetch current metadata (kind: 0 event)
      let currentMetadata = {};
      const subscription = ndkInstance.subscribe({
        kinds: [NDKKind.Metadata],
        authors: [hexNpub],
        limit: 1,
      });

      subscription.on("event", (event) => {
        currentMetadata = JSON.parse(event.content);
      });

      await new Promise((resolve) => subscription.on("eose", resolve));

      // Update the profile picture URL in the metadata
      currentMetadata.picture = profilePictureUrl;

      // Create a new metadata event (kind: 0)
      const metadataEvent = new NDKEvent(ndkInstance, {
        kind: NDKKind.Metadata,
        pubkey: hexNpub,
        created_at: Math.floor(Date.now() / 1000),
        content: JSON.stringify(currentMetadata),
      });

      // Sign and publish the metadata event
      await metadataEvent.sign(signer);
      await metadataEvent.publish();

      console.log("Profile picture updated successfully.");
    } catch (err) {
      console.error("Error setting profile picture on Nostr:", err);
    }
  };

  const generateNostrKeys = async (
    userDisplayName = null,
    setLoadingMessage,
    profileAbout,
    introductionPost
  ) => {
    setLoadingMessage("createAccount.isCreating");
    const privateKeySigner = NDKPrivateKeySigner.generate();

    const privateKey = privateKeySigner.privateKey;
    const user = await privateKeySigner.user();

    const publicKey = user.npub;

    const encodedNsec = bech32.encode(
      "nsec",
      bech32.toWords(Buffer.from(privateKey, "hex"))
    );
    const encodedNpub = bech32.encode(
      "npub",
      bech32.toWords(Buffer.from(publicKey, "hex"))
    );

    setNostrPrivKey(encodedNsec);
    setNostrPubKey(publicKey);

    if (!localStorage.getItem("local_nsec")) {
      //Creating profile... 2/4
      setLoadingMessage("createAccount.isCreatingProfile");
      await postNostrContent(
        JSON.stringify({
          name: userDisplayName,
          about: profileAbout,
          // profilePictureUrl:
          //   "https://image.nostr.build/c8d21fe8773d7c5ddf3d6ef73ffe76dbeeec881c131bfb59927ce0b8b71a5607.png",
          // // "https://primal.b-cdn.net/media-cache?s=o&a=1&u=https%3A%2F%2Fm.primal.net%2FKBLq.png",
        }),
        0,
        publicKey,
        encodedNsec
      );

      setLoadingMessage("createAccount.isCreatingProfilePicture");
      //Creating profile picture... 3/4
      setProfilePicture(
        "https://primal.b-cdn.net/media-cache?s=o&a=1&u=https%3A%2F%2Fm.primal.net%2FKBLq.png",
        publicKey,
        encodedNsec
      );

      // if (
      //   window.location.hostname !== "localhost" &&
      //   window.location.hostname !== "127.0.0.1"
      // ) {

      setLoadingMessage("createAccount.isCreatingIntroPost");
      //Creating introduction post... 4/4
      postNostrContent(introductionPost, 1, publicKey, encodedNsec);

      // await followUserOnNostr(
      //   "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt",
      //   publicKey,
      //   encodedNsec
      // );
    }

    localStorage.setItem("local_nsec", encodedNsec);
    localStorage.setItem("local_npub", publicKey);
    localStorage.setItem("uniqueId", publicKey);

    return { npub: publicKey, nsec: encodedNsec };
  };

  const connectToNostr = async (npubRef = null, nsecRef = null) => {
    const defaultNsec = import.meta.env.VITE_GLOBAL_NOSTR_NSEC;
    const defaultNpub =
      "npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v";

    const nsec = nsecRef || nostrPrivKey || defaultNsec;
    const npub = npubRef || nostrPubKey || defaultNpub;

    try {
      // Decode the nsec from Bech32
      const { words: nsecWords } = bech32.decode(nsec);
      const hexNsec = Buffer.from(bech32.fromWords(nsecWords)).toString("hex");

      // Decode the npub from Bech32
      const { words: npubWords } = bech32.decode(npub);
      const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

      // Create a new NDK instance
      const ndkInstance = new NDK({
        explicitRelayUrls: [
          "wss://relay.damus.io",
          "wss://relay.primal.net",
          "wss://ditto.pub/relay",
        ],
      });

      console.log("connect...");
      // Connect to the relays
      await ndkInstance.connect();

      console.log("Ndk instance", ndkInstance);
      setIsConnected(true);

      // Return the connected NDK instance and signer
      return { ndkInstance, hexNpub, signer: new NDKPrivateKeySigner(hexNsec) };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setErrorMessage(err.message);
      return null;
    }
  };

  const auth = async (nsecPassword) => {
    let testnsec = nsecPassword;

    let decoded = nip19.decode(testnsec);

    const pubkey = getPublicKey(decoded.data);

    const ndk = new NDK({
      explicitRelayUrls: [
        "wss://relay.damus.io",
        "wss://relay.primal.net",
        "wss://ditto.pub/relay",
      ],
    });

    let user = ndk.getUser({ pubkey: pubkey });

    setNostrPrivKey(testnsec);
    setNostrPubKey(user.npub);

    localStorage.setItem("local_nsec", testnsec);
    localStorage.setItem("local_npub", user.npub);
    localStorage.setItem("uniqueId", user.npub);
  };

  const postNostrContent = async (
    content,
    kind = NDKKind.Text,
    npubRef = null,
    nsecRef = null
  ) => {
    const connection = await connectToNostr(npubRef, nsecRef);
    if (!connection) return;

    const { ndkInstance, hexNpub, signer } = connection;

    // Create a new note event
    const noteEvent = new NDKEvent(ndkInstance, {
      kind,
      tags: [],
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      pubkey: hexNpub,
    });

    // Sign the note event

    try {
      await noteEvent.sign(signer);
    } catch (error) {}

    // Publish the note event
    try {
      await noteEvent.publish();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getHexNPub = (npub) => {
    // Decode the npub from Bech32
    const { words: npubWords } = bech32.decode(npub);
    const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

    return hexNpub;
  };

  const assignExistingBadgeToNpub = async (
    badgeNaddr,
    awardeeNpub = localStorage.getItem("local_npub"), // The public key of the user being awarded
    ownerNsec = import.meta.env.VITE_SECRET_KEY // Your private key to sign the event
  ) => {
    if (!awardeeNpub) {
      console.error("Awardee public key is required to award the badge.");
      return;
    }

    if (!ownerNsec) {
      console.error(
        "Owner's private key is required to sign the badge award event."
      );
      return;
    }

    // Connect to Nostr as the badge owner
    const connection = await connectToNostr(
      "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt",
      ownerNsec
    );
    if (!connection) return;

    const { ndkInstance, signer } = connection;

    // Create the event for awarding the badge
    const badgeAwardEvent = new NDKEvent(ndkInstance, {
      kind: NDKKind.BadgeAward, // Badge Award event kind
      tags: [
        ["a", badgeNaddr], // Reference to the Badge Definition event
        [
          "p",
          //npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt
          getHexNPub(localStorage.getItem("local_npub")),
        ], // Public key of the awardee
      ],
      created_at: Math.floor(Date.now() / 1000),
      //npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt
      pubkey: getHexNPub(
        "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt"
      ),
      // Your public key as the issuer
    });

    // Sign the badge event
    try {
      await badgeAwardEvent.sign(signer);
    } catch (error) {
      console.error("Error signing badge event:", error);
    }

    // Publish the badge event
    try {
      await badgeAwardEvent.publish();
      console.log("Badge awarded successfully to:", awardeeNpub);
    } catch (error) {
      console.error("Error publishing badge event:", error);
    }
  };

  const getAddressPointer = (naddr) => {
    return nip19.decode(naddr).data;
  };

  const getBadgeData = async (addy) => {
    try {
      // Connect to Nostr
      const connection = await connectToNostr();
      if (!connection) return [];

      const { ndkInstance, hexNpub } = connection;

      const addressPointer = await getAddressPointer(addy);

      console.log("BDT", addressPointer);
      // Create a filter for badge events (kind 30008) for the given user
      const filter = {
        kinds: [NDKKind.BadgeDefinition], // Use the NDKKind enum for better readability
        authors: [addressPointer.pubkey], // The user's hex-encoded npub
        "#d": [addressPointer.identifier],
        limit: 1,
      };

      // Create a subscription to fetch the events
      const subscription = ndkInstance.subscribe(filter, { closeOnEose: true });

      // Array to hold badges
      const badges = [];

      // Listen for events
      subscription.on("event", (event) => {
        const badgeInfo = {
          content: event.content,
          createdAt: event.created_at,
          tags: event.tags,
          badgeAddress: addy,
        };
        badges.push(badgeInfo);
      });

      // Wait for the subscription to finish
      await new Promise((resolve) => subscription.on("eose", resolve));

      // Log the retrieved badges

      return badges;
    } catch (error) {
      console.error("Error retrieving badges:", error);
      setErrorMessage(error.message);
      return [];
    }
  };
  const getUserBadges = async (npub = localStorage.getItem("local_npub")) => {
    try {
      const connection = await connectToNostr();
      if (!connection) return [];

      const { ndkInstance } = connection;
      const hexNpub = getHexNPub(npub); // Convert npub to hex

      // Create a filter for badge award events (kind 30009) where the user is the recipient
      const filter = {
        kinds: [NDKKind.BadgeAward], // Kind 30009 for badge awards
        "#p": [hexNpub], // Filter by the user's hex-encoded public key as the recipient
        limit: 100, // Adjust the limit as needed
      };

      const subscription = ndkInstance.subscribe(filter, { closeOnEose: true });

      const badges = [];

      subscription.on("event", (event) => {
        console.log("EVENT", event);
        const badgeInfo = {
          content: event.content,
          createdAt: event.created_at,
          tags: event.tags,
        };
        badges.push(badgeInfo);
      });

      await new Promise((resolve) => subscription.on("eose", resolve));

      console.log("badges", badges);
      const uniqueNAddresses = [
        ...new Set(
          badges.flatMap(
            (badge) =>
              badge.tags
                .filter((tag) => tag[0] === "a" && tag[1]) // Find tags where the first element is "a"
                .map((tag) => tag[1]) // Extract the naddress
          )
        ),
      ];

      console.log("uniqueNAddresses", uniqueNAddresses);
      let badgeData = uniqueNAddresses.map((naddress) =>
        getBadgeData(naddress)
      );

      let resolvedBadges = await Promise.all(badgeData);

      const formattedBadges = [];

      // Loop through each outer array in the badgeDataArray
      resolvedBadges.forEach((badgeArray) => {
        // For each inner badge object array (which should have one object), extract name and image
        console.log("badge arr", badgeArray);
        badgeArray.forEach((badge) => {
          let name = "";
          let image = "";

          badge.tags.forEach((tag) => {
            console.log("TAG", tag);
            if (tag[0] === "name") {
              name = tag[1];
            }
            if (tag[0] === "image") {
              image = tag[1];
            }
          });

          // Push the object containing name and image to the badges array
          if (name && image) {
            formattedBadges.push({
              name,
              image,
              badgeAddress: badge.badgeAddress,
            });
          }
        });
      });

      console.log("formattedBadges", formattedBadges);
      return formattedBadges;
    } catch (error) {
      console.error("Error retrieving badges:", error);
      return [];
    }
  };

  // const followUserOnNostr = async (pubkeyToFollow, npubRef, nsecRef) => {
  //   const connection = await connectToNostr(npubRef, nsecRef);
  //   if (!connection) return;

  //   const { ndkInstance, hexNpub, signer } = connection;

  //   try {
  //     const contactList = [];
  //     let subscription;

  //     // Subscribe to current user's kind-3 (Follow List) event
  //     subscription = ndkInstance.subscribe({
  //       kinds: [NDKKind.ContactList],
  //       authors: [getHexNPub(pubkeyToFollow)],
  //       limit: 1,
  //     });

  //     subscription.on("event", (event) => {
  //       // Extract the follow list from the 'p' tags
  //       event.tags.forEach((tag) => {
  //         console.log("there is an event tag");
  //         if (tag[0] === "p") {
  //           console.log("there is a key", tag);

  //           contactList.push(tag[1]); // Push hex key of followed profile
  //         }
  //       });
  //     });

  //     console.log("contactList...", contactList);
  //     // Wait for the subscription to finish or timeout after 5 seconds
  //     await new Promise((resolve, reject) => {
  //       const timeout = setTimeout(() => {
  //         console.warn("Subscription timed out.");
  //         resolve();
  //       }, 5000);

  //       subscription.on("eose", () => {
  //         clearTimeout(timeout);
  //         subscription.unsub(); // Unsubscribe once we receive 'eose'
  //         resolve();
  //       });
  //     });

  //     // Check if the user is already being followed
  //     if (!contactList.includes(pubkeyToFollow)) {
  //       contactList.push(getHexNPub(pubkeyToFollow)); // Add new pubkey if not already in the list
  //     }

  //     // Construct the new kind-3 (Follow List) event
  //     const contactListEvent = new NDKEvent(ndkInstance, {
  //       kind: NDKKind.ContactList, // Kind 3 - Follow List
  //       tags: contactList.map((pubkey) => ["p", pubkey, "", ""]), // Format as per NIP-02
  //       pubkey: hexNpub, // Your public key
  //       created_at: Math.floor(Date.now() / 1000), // Unix timestamp
  //       content: "", // Content not used in kind 3 events
  //     });

  //     // Sign the event with the user's private key (via signer)
  //     await contactListEvent.sign(signer);

  //     // Publish the new kind-3 event (updated follow list)
  //     await contactListEvent.publish();

  //     console.log(`Successfully followed user with pubkey: ${pubkeyToFollow}`);
  //   } catch (err) {
  //     console.error("Error following user on Nostr:", err);
  //   }
  // };

  return {
    isConnected,
    errorMessage,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    postNostrContent,
    auth,
    assignExistingBadgeToNpub,
    getUserBadges,
  };
};
