import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, Text, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useXR } from '@react-three/xr';
import { useStore } from '../store/useStore';

const GEOGRAPHIC_DETAILS: Record<string, string> = {
  "RUSSIA": "The largest country in the world by area, spanning Eastern Europe and Northern Asia. Known for its vast landscapes and rich cultural heritage.",
  "CHINA": "The world's most populous country, located in East Asia. A global leader in technology, manufacturing, and a major historical civilization.",
  "INDIA": "A diverse country in South Asia, known for its deep history, spiritual traditions, and rapidly growing economy.",
  "USA": "A transcontinental country primarily in North America. A major global economic and military power with a highly diverse population.",
  "CANADA": "The second-largest country by area, known for its natural beauty, bilingual culture, and high quality of life.",
  "BRAZIL": "The largest country in South America and Latin America, famous for the Amazon rainforest and vibrant carnival celebrations.",
  "AUSTRALIA": "A country and continent surrounded by the Indian and Pacific oceans, known for its unique wildlife and the Great Barrier Reef.",
  "ALGERIA": "The largest country in Africa, with the Sahara Desert covering 90% of its territory.",
  "SAUDI ARABIA": "The birthplace of Islam and home to Mecca and Medina, covering most of the Arabian Peninsula.",
  "MEXICO": "A mega-diverse country with ancient Mayan and Aztec civilizations, known for its cuisine and biodiversity.",
  "ARGENTINA": "The eighth-largest country and home to the spectacular Andes mountains and Patagonian wilderness.",
  "KAZAKHSTAN": "The world's largest landlocked country, spanning Central Asia and Eastern Europe.",
  "MONGOLIA": "One of the world's most sparsely populated countries, famous for the Gobi Desert and nomadic culture.",
  "INDONESIA": "The world's largest archipelago with over 17,000 islands and extraordinary biodiversity.",
  "EGYPT": "Home to one of the world's oldest civilizations and iconic ancient monuments along the Nile River.",
  "SOUTH AFRICA": "The 'Rainbow Nation' with 11 official languages, home to extraordinary wildlife and scenic landscapes.",
  "FRANCE": "Famous for art, cuisine, fashion, and the Eiffel Tower — the most visited country in the world.",
  "GERMANY": "Europe's largest economy, known for engineering, culture, and the historic Rhine River.",
  "UK": "An island nation with a rich imperial history that shaped much of the modern world.",
  "JAPAN": "An island nation famous for technology, samurai history, cherry blossoms, and unique pop culture.",
  "TURKEY": "A transcontinental country bridging Europe and Asia with a rich Ottoman heritage.",
  "IRAN": "One of the world's oldest civilizations, formerly known as Persia, with stunning architecture.",
  "ETHIOPIA": "The birthplace of coffee and one of Africa's oldest nations, with a unique calendar and script.",
  "NIGERIA": "Africa's most populous nation and largest economy, with over 250 ethnic groups.",
  "PAKISTAN": "Home to K2, the world's second-highest mountain, and ancient Indus Valley civilizations.",
  "BANGLADESH": "One of the world's most densely populated countries, located in the Bengal delta.",
  "VIETNAM": "A Southeast Asian country with stunning landscapes from Ha Long Bay to the Mekong Delta.",
  "THAILAND": "The 'Land of Smiles', famous for ornate temples, tropical beaches, and vibrant street food.",
  "SPAIN": "A country of diverse regions, flamenco dancing, and stunning architecture like La Sagrada Família.",
  "ITALY": "The birthplace of the Roman Empire and Renaissance art, with world-famous cuisine and fashion.",
  "SOUTH KOREA": "A global leader in technology and K-pop culture, with ancient palaces alongside ultramodern cities.",
  "COLOMBIA": "Named after Christopher Columbus, known for its coffee, biodiversity, and vibrant culture.",
  "PERU": "Home to the ancient Incan Empire and Machu Picchu, high in the Andes Mountains.",
  "UKRAINE": "The largest country entirely within Europe, with vast fertile plains called 'the breadbasket of Europe'.",
  "POLAND": "A Central European country with a resilient history, known for medieval old towns.",
  "MOROCCO": "A North African kingdom famous for its medinas, souks, and the Atlas Mountains.",
  "KENYA": "Home to the Great Rift Valley and the Maasai Mara — one of Africa's premier wildlife destinations.",
  "TANZANIA": "Home to Mount Kilimanjaro, Africa's highest peak, and the Serengeti National Park.",
  "CHILE": "The world's longest country from north to south, stretching over 4,300 km along South America's west coast.",
  "PHILIPPINES": "An archipelago of over 7,600 islands, known for beautiful beaches and biodiversity.",
  "MALAYSIA": "A multicultural country famous for the Petronas Twin Towers and diverse rainforests.",
  "IRAQ": "The 'Cradle of Civilization' — ancient Mesopotamia — with the Tigris and Euphrates rivers.",
  "AFGHANISTAN": "A landlocked country in Central Asia with a rich history as a crossroads of civilizations.",
  "SUDAN": "Home to more ancient pyramids than Egypt, located along the Nile River.",
  "SWEDEN": "A Scandinavian nation famous for ABBA, IKEA, Volvo, and breathtaking fjords.",
  "NORWAY": "Home to the Northern Lights and stunning fjords, consistently ranked the happiest country.",
  "FINLAND": "Has more saunas than cars! Home to the original Santa Claus village in Lapland.",
};

const FUN_FACTS: Record<string, string[]> = {
  "RUSSIA": ["🌍 Crosses 11 time zones — the most of any country!", "🐯 Has over 500 Amur tigers in the wild", "🚂 Trans-Siberian Railway is the world's longest at 9,289 km"],
  "CHINA": ["🏯 The Great Wall stretches over 21,000 km", "🐼 Giant pandas only live in China", "🧧 China invented paper, printing, gunpowder & the compass"],
  "INDIA": ["🛺 Has the most post offices in the world", "🐅 Home to 70% of the world's tigers", "♟️ Chess was invented in India around 600 AD"],
  "USA": ["🗽 The Statue of Liberty was a gift from France in 1886", "🦅 Bald Eagles were nearly extinct in the 1960s but recovered", "🌵 Alaska is bigger than all but 18 countries in the world"],
  "CANADA": ["🍁 Has the longest coastline of any country — over 202,000 km", "🐻 Has more lakes than all other countries combined", "🏒 Ice hockey is the national winter sport"],
  "BRAZIL": ["🌿 Amazon rainforest covers 60% of the country", "⚽ Has won the FIFA World Cup 5 times — more than any nation", "🦜 Home to 1,800 species of birds"],
  "AUSTRALIA": ["🦘 There are more kangaroos than people in Australia", "🪃 The boomerang was invented here over 50,000 years ago", "🏖️ Has over 10,000 beaches — one for every day of your life!"],
  "ALGERIA": ["🌵 Sahara Desert covers about 90% of the country", "🦅 The national emblem features the crescent moon and star", "🏺 Has some of the oldest cave paintings — 12,000 years old"],
  "SAUDI ARABIA": ["🕌 Mecca is visited by over 2 million pilgrims annually", "🌴 Produces 1 million tons of dates per year", "🐫 Has the world's largest camel market"],
  "MEXICO": ["🌮 Chocolate was first made here by the ancient Maya", "🌺 Home to 10–12% of all species on Earth", "🎶 Mariachi music is a UNESCO Cultural Heritage"],
  "ARGENTINA": ["🥩 Consumes the most beef per capita in the world", "💃 Birthplace of the tango dance", "🏔️ Aconcagua is the highest mountain outside Asia at 6,961 m"],
  "JAPAN": ["🗻 Mount Fuji is Japan's highest peak at 3,776 m", "🚄 Shinkansen bullet trains are on time to within 1 minute", "🌸 Has over 200 cherry blossom festivals annually", "🎮 Nintendo, Sony, and Toyota all started in Japan"],
  "FRANCE": ["🗼 The Eiffel Tower grows 15 cm taller in summer heat", "🧀 Has over 1,200 varieties of cheese", "🐓 Has more time zones than any other country — 12!"],
  "UK": ["☂️ London averages only 1.5 hours of sun per day in winter", "📖 The British Museum attracts 6 million visitors per year", "🎭 Shakespeare wrote 37 plays that still influence culture today"],
  "INDONESIA": ["🏝️ Spreads across an area wider than the USA", "🌋 Has about 130 active volcanoes — the most in the world", "🦎 Home to the Komodo dragon, the world's largest lizard"],
  "EGYPT": ["🏛️ The Great Pyramid was the tallest structure for 3,800 years", "🐊 Nile River is the longest river in the world", "🐱 Ancient Egyptians worshipped cats as sacred animals"],
  "GERMANY": ["🍺 Has over 1,300 types of beer", "🚗 Autobahn has sections with no speed limit", "🎶 Beethoven, Bach, and Brahms were all German"],
  "KENYA": ["🏃 Kenya has produced more Olympic marathon champions than any other country", "🦁 Has over 40% of Africa's wildlife species", "☕ Tea is Kenya's most valuable export"],
  "PERU": ["🦙 80% of the world's alpacas live in Peru", "🥔 Potato originated in Peru — with over 3,000 varieties!", "✨ Machu Picchu sits at 2,430 metres above sea level"],
  "CHILE": ["🌶️ Named one of the driest places on Earth — Atacama Desert", "🍷 Produces world-famous Malbec and Cabernet wines", "🔭 Has some of the clearest skies for stargazing in the world"],
  "NORWAY": ["🌅 Has the midnight sun for 76 days a year above Arctic Circle", "🐟 Exports the most salmon in the world", "🛳️ Has the longest road tunnel in the world — 24.5 km"],
  "SWEDEN": ["📱 Spotify and Minecraft were both created in Sweden", "♻️ Recycles 99% of household waste", "🧊 Has an entire hotel made of ice rebuilt every year"],
  "FINLAND": ["🎅 Santa Claus officially lives in Rovaniemi, Finland", "🏊 Has over 3 million saunas for 5.5 million people", "🦌 Reindeer outnumber people in some northern regions"],
  "SOUTH KOREA": ["📱 South Korea has the fastest internet in the world", "🎮 Professional gaming (esports) is a massive national sport", "🍜 Instant noodles (ramen) were popularized here"],
  "TURKEY": ["🌷 Tulips originated in Turkey, not the Netherlands!", "🧶 Istanbul is the only city in the world on two continents", "☕ Turkish coffee is brewed directly in the cup without a filter"],
  "VIETNAM": ["🍜 Pho soup is eaten for breakfast, lunch, and dinner", "🛵 Motorbikes outnumber cars 4 to 1", "🐉 Vietnamese mythology says people descended from a dragon", "🌿 One of the top coffee producers in the world"],
  "THAILAND": ["🐘 White elephants are considered sacred and royal", "🙏 Has over 40,000 Buddhist temples", "🌺 Orchids are Thailand's most exported flower"],
  "NIGERIA": ["🎬 'Nollywood' is the world's 2nd largest film industry", "🥁 Has over 521 different languages spoken", "🦅 The eagle on its flag represents strength"],
  "PAKISTAN": ["🏔️ Has 5 of the world's 14 tallest mountains", "🧪 Algebra was developed by Muslim scholars from this region", "🌹 Pakistan grows the most roses for rose oil"],
  "SOUTH AFRICA": ["💎 Produces over 70% of the world's platinum", "🌈 Has 11 official languages", "🦏 Home to 80% of the world's rhinos"],
  "ETHIOPIA": ["☕ Coffee originated in Ethiopia — legend says a goat herder discovered it!", "🕊️ Unique 13-month calendar means they celebrate New Year on Sep 11", "🏺 'Lucy' — a 3.2 million year old fossil — was found here"],
  "COLOMBIA": ["☕ Produces some of the world's finest Arabica coffee", "🌸 Has 1,800 orchid species — the most of any country", "💛 Has the world's largest population of blue-and-yellow macaws"],
  "MALAYSIA": ["🦧 Borneo is home to wild orangutans", "🌴 Produces 90% of the world's palm oil", "🏙️ The Petronas Towers were the world's tallest from 1998–2004"],
  "IRAN": ["🎨 Persian rugs are over 2,500 years old", "🌹 Iran is the world's largest producer of saffron", "♟️ Chess reached Europe via Persia (Iran)"],
  "IRAQ": ["📜 Cuneiform writing — the world's first writing system — originated here", "🌊 Tigers and lions once roamed ancient Mesopotamia", "🏛️ Babylon was once the largest city in the world"],
  "UKRAINE": ["🌻 Sunflower is the national flower and a major crop", "🎼 Nutcracker composer Tchaikovsky was Ukrainian-born", "⚛️ Chernobyl exclusion zone is now a surprising wildlife refuge"],
  "POLAND": ["🎹 Frederic Chopin was Polish", "🧀 Pierogi and kielbasa are beloved national dishes", "🏰 Wrocław has 112 bridges — more than Venice!"],
  "MOROCCO": ["🐪 Used to export 'Morocco leather' made from goat skin", "🎨 Fez city has the world's oldest university — founded 859 AD", "🌵 Argan oil — used in luxury cosmetics — only comes from here"],
  "TANZANIA": ["🌋 Olduvai Gorge is where the earliest human fossils were found", "🐘 Has the largest elephant population in Africa", "🏔️ Kilimanjaro's ice caps are predicted to disappear by 2060"],
  "PHILIPPINES": ["🏝️ Has the world's longest coastline for an archipelago", "🎤 Karaoke is extremely popular — called 'videoke' here", "🦅 The Philippine eagle has a wingspan of 2 metres"],
  "AFGHANISTAN": ["🌺 Once known as 'the crossroads of Central Asia'", "🎯 Buzkashi — polo with a goat carcass — is the national sport", "💎 Home to the finest lapis lazuli gemstones in the world"],
  "SUDAN": ["🏛️ Has more pyramids than Egypt — over 200!", "🌊 The Blue Nile and White Nile meet in Khartoum", "🦒 Has a unique species of giraffe found nowhere else"],
  "BANGLADESH": ["🐅 Sundarbans mangrove forest is home to the Bengal tiger", "🌿 Jute — used in burlap sacks — is a major export", "🎶 Has one of the world's most beautiful national anthems"],
  "SPAIN": ["🍅 La Tomatina festival involves throwing tomatoes at each other", "🐂 Has over 1,700 bullfighting events per year", "🎨 Picasso, Dalí, and Goya were all Spanish artists"],
  "ITALY": ["🍕 Pizza was invented in Naples in the 18th century", "🏛️ Rome has more fountains than any other city in the world", "🌋 Mount Vesuvius buried Pompeii in 79 AD"],
  "KAZAKHSTAN": ["🚀 Baikonur Cosmodrome — where Yuri Gagarin launched to space — is here", "🐎 Horse meat is a traditional delicacy", "🌾 Was the world's largest wheat exporter in the Soviet era"],
  "MONGOLIA": ["🐎 Has more horses than people", "🏕️ 30% of the population still lives as nomads", "🌡️ Temperatures range from -45°C in winter to 40°C in summer"],
};


function Hoverable({ name, description, children, color = "#00ffff" }: { name: string, description: string, children: React.ReactNode, color?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      className="relative pointer-events-auto"
    >
      {children}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-900/95 border border-white/10 text-white p-3 rounded-xl text-[10px] pointer-events-none whitespace-normal w-48 shadow-2xl z-50 backdrop-blur-md">
           <div className="flex flex-col gap-1">
             <strong className="uppercase tracking-widest text-[8px] mb-1" style={{ color }}>Geographic Analysis</strong>
             <span className="font-bold text-white text-xs">{name}</span>
             <p className="text-zinc-400 leading-relaxed font-medium">{description}</p>
           </div>
        </div>
      )}
    </div>
  );
}

function SmartHtml({ children, name, description, color, ...props }: any) {
  const findText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(findText).join('');
    if (node?.props?.children) return findText(node.props.children);
    return '';
  };
  
  const textContent = findText(children).trim().toUpperCase();
  const labelName = name || textContent;
  const labelDesc = description || GEOGRAPHIC_DETAILS[textContent] || "Detailed geographic and geopolitical overview of the selected region.";

  return (
    <Html {...props}>
      <Hoverable name={labelName} description={labelDesc} color={color}>
        {children}
      </Hoverable>
    </Html>
  );
}

export const COUNTRIES = [
  { name: 'RUSSIA', lat: 61.524, lon: 105.318 },
  { name: 'CHINA', lat: 35.861, lon: 104.195 },
  { name: 'INDIA', lat: 22.973, lon: 78.656 },
  { name: 'USA', lat: 37.090, lon: -95.712 },
  { name: 'CANADA', lat: 56.130, lon: -106.346 },
  { name: 'BRAZIL', lat: -14.235, lon: -51.925 },
  { name: 'AUSTRALIA', lat: -25.274, lon: 133.775 },
  { name: 'ALGERIA', lat: 28.033, lon: 1.659 },
  { name: 'SAUDI ARABIA', lat: 23.885, lon: 45.079 },
  { name: 'MEXICO', lat: 23.634, lon: -102.552 },
  { name: 'ARGENTINA', lat: -38.416, lon: -63.616 },
  { name: 'KAZAKHSTAN', lat: 48.019, lon: 66.923 },
  { name: 'MONGOLIA', lat: 46.862, lon: 103.846 },
  { name: 'INDONESIA', lat: -0.789, lon: 113.921 },
  { name: 'EGYPT', lat: 26.820, lon: 30.802 },
  { name: 'SOUTH AFRICA', lat: -30.559, lon: 22.937 },
  { name: 'FRANCE', lat: 46.227, lon: 2.213 },
  { name: 'GERMANY', lat: 51.165, lon: 10.451 },
  { name: 'UK', lat: 55.378, lon: -3.435 },
  { name: 'JAPAN', lat: 36.204, lon: 138.252 },
  { name: 'TURKEY', lat: 38.963, lon: 35.243 },
  { name: 'IRAN', lat: 32.427, lon: 53.688 },
  { name: 'ETHIOPIA', lat: 9.145, lon: 40.489 },
  { name: 'NIGERIA', lat: 9.082, lon: 8.675 },
  { name: 'PAKISTAN', lat: 30.375, lon: 69.345 },
  { name: 'BANGLADESH', lat: 23.685, lon: 90.356 },
  { name: 'VIETNAM', lat: 14.058, lon: 108.277 },
  { name: 'THAILAND', lat: 15.870, lon: 100.993 },
  { name: 'SPAIN', lat: 40.463, lon: -3.749 },
  { name: 'ITALY', lat: 41.871, lon: 12.567 },
  { name: 'SOUTH KOREA', lat: 35.907, lon: 127.766 },
  { name: 'COLOMBIA', lat: 4.570, lon: -74.297 },
  { name: 'PERU', lat: -9.190, lon: -75.015 },
  { name: 'UKRAINE', lat: 48.379, lon: 31.165 },
  { name: 'POLAND', lat: 51.919, lon: 19.145 },
  { name: 'MOROCCO', lat: 31.791, lon: -7.092 },
  { name: 'KENYA', lat: -0.023, lon: 37.906 },
  { name: 'TANZANIA', lat: -6.369, lon: 34.888 },
  { name: 'CHILE', lat: -35.675, lon: -71.543 },
  { name: 'PHILIPPINES', lat: 12.879, lon: 121.774 },
  { name: 'MALAYSIA', lat: 4.210, lon: 101.975 },
  { name: 'IRAQ', lat: 33.223, lon: 43.679 },
  { name: 'AFGHANISTAN', lat: 33.939, lon: 67.709 },
  { name: 'SUDAN', lat: 12.862, lon: 30.217 },
  { name: 'SWEDEN', lat: 60.128, lon: 18.643 },
  { name: 'NORWAY', lat: 60.472, lon: 8.468 },
  { name: 'FINLAND', lat: 61.924, lon: 25.748 },
];

export function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export function GlobeModel({ showLabels, setFocusTarget, controlsRef, detail = 'high', ...props }: { 
  showLabels?: boolean,
  setFocusTarget?: (target: { position: THREE.Vector3, target: THREE.Vector3 } | null) => void,
  controlsRef?: React.RefObject<any>,
  detail?: 'high' | 'low'
}) {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const labelsGroupRef = useRef<THREE.Group>(null);
  const hoveredCountry = useRef<string | null>(null);
  const [hoveredCountryState, setHoveredCountryState] = useState<string | null>(null);

  const session = useXR((state: any) => state.session);
  const isARMode = useStore(state => state.isARMode);
  const isAR = (session as any)?.mode === 'immersive-ar' || isARMode;

  const colorMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-topology.png');
  
  const countryLabels = useMemo(() => {
    const countries = detail === 'low' ? COUNTRIES.slice(0, 10) : COUNTRIES;
    return countries.map(country => ({
      ...country,
      position: latLonToVector3(country.lat, country.lon, 1.55)
    }));
  }, [detail]);

  // Handle wheel event for targeted zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!controlsRef?.current || !hoveredCountry.current) return;

      // If we are zooming in (deltaY < 0), move the target towards the hovered country
      if (e.deltaY < 0) {
        const country = countryLabels.find(c => c.name === hoveredCountry.current);
        if (country && labelsGroupRef.current) {
          const worldPos = country.position.clone();
          labelsGroupRef.current.localToWorld(worldPos);
          
          // Smoothly move the controls target towards the world position
          controlsRef.current.target.lerp(worldPos, 0.1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [controlsRef, countryLabels]);

  const isFocused = useRef(false);

  useFrame((state) => {
    if (isFocused.current) return; // Stop rotation when focused to maintain precision

    const t = state.clock.getElapsedTime();
    const rotationSpeed = 0.08;
    
    if (globeRef.current) {
      globeRef.current.rotation.y = t * rotationSpeed;
    }

    if (labelsGroupRef.current) {
      labelsGroupRef.current.rotation.y = t * rotationSpeed;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * rotationSpeed;
    }
  });

  const handleCountryClick = useCallback((country: any) => {
    if (!setFocusTarget || !labelsGroupRef.current) return;
    
    isFocused.current = true;
    
    const worldPos = new THREE.Vector3();
    const localPos = country.position.clone();
    labelsGroupRef.current.localToWorld(localPos);
    worldPos.copy(localPos);
    
    // Calculate a camera position that is looking at the country
    // Offset along the normal from the globe surface
    const globeWorldPos = new THREE.Vector3();
    groupRef.current?.getWorldPosition(globeWorldPos);
    
    const direction = worldPos.clone().sub(globeWorldPos).normalize();
    const cameraPos = worldPos.clone().add(direction.multiplyScalar(2.2));
    
    setFocusTarget({
      position: cameraPos,
      target: worldPos
    });
  }, [setFocusTarget]);

  useEffect(() => {
    if (detail !== 'high') return;
    
    const handleVoiceCommand = (e: any) => {
      const command = (e.detail || '').toLowerCase().trim();
      if (command.includes('zoom') || command.includes('show') || command.includes('find')) {
        const country = countryLabels.find(c => command.includes(c.name.toLowerCase()));
        if (country) {
          handleCountryClick(country);
        }
      } else if (command.includes('reset') || command.includes('center') || command.includes('full globe') || command.includes('back')) {
        isFocused.current = false;
        if (setFocusTarget) setFocusTarget(null);
      }
    };
    
    window.addEventListener('app-voice-transcript', handleVoiceCommand);
    return () => window.removeEventListener('app-voice-transcript', handleVoiceCommand);
  }, [countryLabels, handleCountryClick, detail, setFocusTarget]);

  return (
    <group ref={groupRef} scale={1.8} {...props}>
      {/* Main Globe */}
      <mesh 
        ref={globeRef} 
        castShadow 
        receiveShadow
        onPointerOut={() => { hoveredCountry.current = null; }}
      >
        <sphereGeometry args={[1.5, detail === 'low' ? 32 : 256, detail === 'low' ? 32 : 256]} />
        <meshStandardMaterial 
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.12}
          roughness={0.3}
          metalness={0.05}
          emissive="#000e22"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Separate group for labels that rotates with the globe but uses Billboard */}
      <group ref={labelsGroupRef}>
        {countryLabels.map((country, idx) => (
          <group 
            key={idx} 
            position={country.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              hoveredCountry.current = country.name;
              document.body.style.cursor = 'pointer';
              setHoveredCountryState(country.name);
            }}
            onPointerOut={() => {
              hoveredCountry.current = null;
              document.body.style.cursor = 'auto';
              setHoveredCountryState(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCountryClick(country);
            }}
          >
            <Billboard>
              <Text
                fontSize={0.04}
                color={hoveredCountry.current === country.name ? "#ffffff" : "#00ffff"}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                outlineWidth={0.003}
                outlineColor="#000000"
                fillOpacity={0.95}
              >
                {country.name}
              </Text>
            </Billboard>
            {hoveredCountryState === country.name && (
              <Html center position={[0, 0, 0]}>
                <div className="bg-zinc-900/97 border border-white/15 text-white p-4 rounded-2xl text-[10px] pointer-events-none whitespace-normal w-64 shadow-2xl z-50 backdrop-blur-xl">
                   <div className="flex flex-col gap-2">
                     <strong className="uppercase tracking-widest text-[8px] text-cyan-400 flex items-center gap-1">
                       🌐 Geographic Analysis
                     </strong>
                     <span className="font-bold text-white text-xs border-b border-white/10 pb-2">{country.name}</span>
                     <p className="text-zinc-400 leading-relaxed font-medium text-[10px]">
                       {GEOGRAPHIC_DETAILS[country.name] || "Detailed geographic and geopolitical overview of the selected region."}
                     </p>
                     {FUN_FACTS[country.name] && (
                       <div className="mt-1 pt-2 border-t border-yellow-500/20">
                         <div className="text-[8px] font-black uppercase tracking-widest text-yellow-400 mb-1.5">✨ Fun Facts</div>
                         <ul className="space-y-1">
                           {FUN_FACTS[country.name].map((fact, fi) => (
                             <li key={fi} className="text-[9px] text-zinc-300 leading-snug">{fact}</li>
                           ))}
                         </ul>
                       </div>
                     )}
                     <div className="text-[8px] text-zinc-600 text-center pt-1">Click to zoom in</div>
                   </div>
                </div>
              </Html>
            )}
            {/* Small glowing dot for location */}
            <mesh position={[0, 0, -0.01]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshBasicMaterial color={hoveredCountry.current === country.name ? "#ffffff" : "#00ffff"} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Atmosphere / Clouds Layer */}
      {!isAR && (
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[1.52, detail === 'low' ? 32 : 256, detail === 'low' ? 32 : 256]} />
          <meshPhongMaterial 
            color="#88ccff"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Outer Glow */}
      {!isAR && (
        <mesh>
          <sphereGeometry args={[1.65, detail === 'low' ? 32 : 256, detail === 'low' ? 32 : 256]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.03} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}


    </group>
  );
}

