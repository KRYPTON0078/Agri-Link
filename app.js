// AgriLink - Complete Professional Version with All Features
class AgriLink {
    constructor() {
        this.orders = [];
        this.products = this.initializeProducts();
        this.ratings = [];
        this.shipments = [];
        this.currentView = 'buyer';
        this.ratingContext = null;
        this.trackingIntervals = {};
        this.loadFromStorage();
        this.init();
    }

    initializeProducts() {
        return [
            // Mozambique Products
            {
                id: 'moz-soybeans',
                name: 'Premium Soybeans',
                country: 'mozambique',
                location: 'Nampula, Mozambique',
                price: '$485/ton',
                unit: '100 tons',
                sustainability: 95,
                farmer: {
                    name: 'Carlos Silva',
                    email: 'carlos.silva@agricola.co.mz',
                    phone: '+258 84 123 4567',
                    rating: 4.8,
                    totalRatings: 47,
                    cooperative: 'Coop Agricola Nampula',
                    experience: '15 years farming',
                    languages: ['Portuguese', 'English']
                },
                prediction: 'Rising',
                description: 'High-protein soybeans perfect for tofu and animal feed production'
            },
            {
                id: 'moz-coffee',
                name: 'Arabica Coffee',
                country: 'mozambique', 
                location: 'Manica, Mozambique',
                price: '$2,500/ton',
                unit: '50 tons',
                sustainability: 88,
                farmer: {
                    name: 'Maria Santos',
                    email: 'maria.santos@cafemanica.mz',
                    phone: '+258 86 654 3210',
                    rating: 4.9,
                    totalRatings: 32,
                    cooperative: 'Café Manica Family Farms',
                    experience: '12 years farming',
                    languages: ['Portuguese', 'Spanish']
                },
                prediction: 'Stable',
                description: 'Premium shade-grown Arabica with chocolate and citrus notes'
            },
            {
                id: 'moz-moringa',
                name: 'Organic Moringa Powder',
                country: 'mozambique',
                location: 'Zambezia, Mozambique',
                price: '$8,500/ton',
                unit: '5 tons',
                sustainability: 92,
                farmer: {
                    name: 'João Maputo',
                    email: 'joao.maputo@moringa.mz',
                    phone: '+258 82 111 2222',
                    rating: 4.7,
                    totalRatings: 28,
                    cooperative: 'Zambezia Organic Collective',
                    experience: '8 years farming',
                    languages: ['Portuguese', 'English']
                },
                prediction: 'Rising',
                description: 'Nutrient-rich organic moringa powder for health supplements'
            },
            {
                id: 'moz-mango',
                name: 'Sun-Dried Mango',
                country: 'mozambique',
                location: 'Gaza, Mozambique',
                price: '$3,200/ton',
                unit: '20 tons',
                sustainability: 85,
                farmer: {
                    name: 'Ana Chissano',
                    email: 'ana.chissano@fruits.mz',
                    phone: '+258 85 333 4444',
                    rating: 4.6,
                    totalRatings: 41,
                    cooperative: 'Gaza Fruit Producers',
                    experience: '10 years farming',
                    languages: ['Portuguese']
                },
                prediction: 'Stable',
                description: 'Naturally sun-dried mango slices, no preservatives added'
            },

            // São Tomé and Príncipe Products
            {
                id: 'st-cocoa',
                name: 'Premium Single-Origin Cocoa',
                country: 'sao-tome',
                location: 'São Tomé Island',
                price: '$12,000/ton',
                unit: '10 tons',
                sustainability: 96,
                farmer: {
                    name: 'Rocha Plantation',
                    email: 'contact@rochacocoa.st',
                    phone: '+239 99 123 456',
                    rating: 5.0,
                    totalRatings: 63,
                    cooperative: 'São Tomé Cocoa Association',
                    experience: '3 generations',
                    languages: ['Portuguese', 'French', 'English']
                },
                prediction: 'Rising',
                description: 'Award-winning fine cocoa beans for premium chocolate production'
            },
            {
                id: 'st-tuna',
                name: 'Fresh Yellowfin Tuna',
                country: 'sao-tome',
                location: 'Príncipe Island',
                price: '$6,800/ton',
                unit: '15 tons',
                sustainability: 89,
                farmer: {
                    name: 'Fisherman Cooperative',
                    email: 'tuna@principe-fish.st',
                    phone: '+239 98 765 432',
                    rating: 4.8,
                    totalRatings: 55,
                    cooperative: 'Príncipe Sustainable Fisheries',
                    experience: 'Traditional fishing methods',
                    languages: ['Portuguese']
                },
                prediction: 'Stable',
                description: 'Line-caught yellowfin tuna, sushi-grade quality'
            },

            // Guinea-Bissau Products
            {
                id: 'gw-cashew',
                name: 'Organic Raw Cashew Nuts',
                country: 'guinea-bissau',
                location: 'Bafatá, Guinea-Bissau',
                price: '$2,800/ton',
                unit: '25 tons',
                sustainability: 91,
                farmer: {
                    name: 'Amadu Diallo',
                    email: 'amadu.diallo@cashew.gw',
                    phone: '+245 95 555 6666',
                    rating: 4.7,
                    totalRatings: 72,
                    cooperative: 'Bafatá Cashew Growers',
                    experience: '20 years farming',
                    languages: ['Portuguese', 'Fula', 'French']
                },
                prediction: 'Rising',
                description: 'Premium organic cashews, hand-selected for quality'
            },
            {
                id: 'gw-fish',
                name: 'Fresh Atlantic Fish',
                country: 'guinea-bissau',
                location: 'Bolama, Guinea-Bissau',
                price: '$4,500/ton',
                unit: '30 tons',
                sustainability: 87,
                farmer: {
                    name: 'Fishermen Association',
                    email: 'fish@bolama-coop.gw',
                    phone: '+245 96 777 8888',
                    rating: 4.5,
                    totalRatings: 38,
                    cooperative: 'Bolama Coastal Fisheries',
                    experience: 'Traditional fishing community',
                    languages: ['Portuguese', 'Crioulo']
                },
                prediction: 'Stable',
                description: 'Mixed Atlantic fish catch, sustainably harvested'
            }
        ];
    }

    init() {
        this.showView('buyer');
        this.updateStats();
        this.setupNavigation();
        this.renderProducts();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        const countryFilters = document.querySelectorAll('.country-filter');
        countryFilters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                countryFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    showView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        document.getElementById(`${viewName}-view`).classList.add('active');
        this.currentView = viewName;
        
        if (viewName === 'farmer') {
            this.renderFarmerOrders();
        } else if (viewName === 'blockchain') {
            this.renderBlockchainSteps();
        } else if (viewName === 'ratings') {
            this.renderRatingsView();
        } else if (viewName === 'impact') {
            this.updateImpactMetrics();
        } else if (viewName === 'tracking') {
            this.renderTrackingView();
        }
    }

    filterProducts(country) {
        const container = document.getElementById('products-container');
        let filteredProducts = this.products;
        
        if (country !== 'all') {
            filteredProducts = this.products.filter(product => product.country === country);
        }
        
        this.renderProducts(filteredProducts);
    }

    renderProducts(products = this.products) {
        const container = document.getElementById('products-container');
        
        container.innerHTML = products.map(product => `
            <div class="border-2 border-green-200 rounded-2xl p-6 card-hover">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <h3 class="font-bold text-xl">${product.name}</h3>
                            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                🌱 ${product.sustainability}% Sustainable
                            </span>
                            <span class="bg-${product.country === 'mozambique' ? 'green' : product.country === 'sao-tome' ? 'yellow' : 'red'}-100 text-${product.country === 'mozambique' ? 'green' : product.country === 'sao-tome' ? 'yellow' : 'red'}-800 px-3 py-1 rounded-full text-sm font-medium">
                                ${this.getCountryFlag(product.country)} ${this.getCountryName(product.country)}
                            </span>
                        </div>
                        
                        <p class="text-gray-600 mb-4">
                            <i class="fas fa-map-marker-alt text-red-500 mr-1"></i>
                            ${product.location}
                        </p>
                        
                        <!-- Farmer Information -->
                        <div class="bg-gray-50 rounded-lg p-4 mb-4">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-user text-green-600"></i>
                                    <span class="font-semibold">${product.farmer.name}</span>
                                    <div class="rating-stars">
                                        ${this.generateStarRating(product.farmer.rating)}
                                        <span class="text-sm text-gray-600 ml-1">(${product.farmer.totalRatings})</span>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                <div><i class="fas fa-envelope mr-2"></i>${product.farmer.email}</div>
                                <div><i class="fas fa-phone mr-2"></i>${product.farmer.phone}</div>
                                <div><i class="fas fa-users mr-2"></i>${product.farmer.cooperative}</div>
                                <div><i class="fas fa-clock mr-2"></i>${product.farmer.experience}</div>
                            </div>
                        </div>

                        <p class="text-gray-700 mb-4">${product.description}</p>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                <i class="fas fa-chart-line mr-1"></i>AI Trend: ${product.prediction}
                            </span>
                            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                <i class="fas fa-shield-alt mr-1"></i>Quality Guaranteed
                            </span>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                <i class="fas fa-bolt mr-1"></i>Fast Delivery
                            </span>
                        </div>
                    </div>
                    
                    <div class="text-right ml-6">
                        <p class="text-3xl font-bold text-gray-900 mb-2">${product.price.split('/')[0]}<sub class="text-lg">/${product.price.split('/')[1]}</sub></p>
                        <p class="text-green-600 font-medium mb-4">
                            <i class="fas fa-arrow-up mr-1"></i>AI Recommended
                        </p>
                        <button onclick="agriLink.placeOrder('${product.id}')" class="agri-green text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                            <i class="fas fa-file-contract mr-2"></i>
                            Place Smart Order
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCountryFlag(country) {
        const flags = {
            'mozambique': '🇲🇿',
            'sao-tome': '🇸🇹', 
            'guinea-bissau': '🇬🇼'
        };
        return flags[country] || '🌍';
    }

    getCountryName(country) {
        const names = {
            'mozambique': 'Mozambique',
            'sao-tome': 'São Tomé & Príncipe',
            'guinea-bissau': 'Guinea-Bissau'
        };
        return names[country] || 'Unknown';
    }

    generateStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    placeOrder(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const order = {
            id: Date.now(),
            productId: product.id,
            product: product.name,
            price: product.price,
            unit: product.unit,
            country: product.country,
            farmer: product.farmer,
            status: 'pending',
            txHash: '0x' + Math.random().toString(16).substr(2, 40),
            timestamp: new Date().toLocaleString(),
            sustainability: product.sustainability,
            farmerAccepted: false,
            preFinance: null,
            completed: false,
            rated: false
        };

        this.orders.push(order);
        this.saveToStorage();
        this.updateStats();
        
        this.showNotification(`✅ Smart Contract Created!`, `
            <strong>${product.name}</strong> order placed successfully!<br>
            👨🌾 Farmer: ${product.farmer.name}<br>
            ⛓️ Transaction: ${order.txHash}<br>
            💰 Amount: ${product.price}<br>
            📦 ${product.unit}<br>
            <br>
            <em>The order is now available for ${product.farmer.name} to accept with instant pre-financing.</em>
        `);
    }

    acceptOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order && !order.farmerAccepted) {
            order.farmerAccepted = true;
            order.preFinance = `$${(Math.floor(Math.random() * 20) + 10) * 1000}`;
            order.status = 'accepted';
            this.saveToStorage();
            this.renderFarmerOrders();
            this.updateStats();
            
            this.showNotification(`💰 Pre-Finance Approved!`, `
                <strong>${order.product}</strong> accepted by ${order.farmer.name}!<br>
                💵 Pre-finance: ${order.preFinance} disbursed<br>
                🚚 Ready for production and delivery<br>
                <br>
                <em>Funds are available immediately for seeds, equipment, and labor.</em>
            `);
        }
    }

    completeOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.farmerAccepted && !order.completed) {
            order.completed = true;
            order.status = 'completed';
            order.completedAt = new Date().toLocaleString();
            this.saveToStorage();
            this.renderFarmerOrders();
            this.updateStats();
            this.updateImpactMetrics();
            
            // Create shipment for tracking
            this.createShipment(order);
            
            // Prompt for rating
            setTimeout(() => {
                this.openRatingModal(order, 'farmer');
            }, 1000);
            
            this.showNotification(`🎉 Order Completed!`, `
                <strong>${order.product}</strong> delivered to DHL!<br>
                🚚 DHL tracking activated<br>
                💰 Payment: ${order.price} released<br>
                ⛓️ Transaction finalized on blockchain<br>
                <br>
                <em>You can now track your shipment in real-time.</em>
            `);
        }
    }

    // SHIPPING TRACKING METHODS
    initializeShippingRoutes() {
        return {
            'mozambique': {
                origin: 'Maputo, Mozambique',
                destination: 'Shanghai, China',
                route: [
                    { location: 'Maputo, Mozambique', status: 'picked_up', time: '2 hours ago' },
                    { location: 'Johannesburg, South Africa', status: 'in_transit', time: 'Next' },
                    { location: 'Dubai, UAE', status: 'pending', time: 'Estimated' },
                    { location: 'Hong Kong', status: 'pending', time: 'Estimated' },
                    { location: 'Shanghai, China', status: 'delivered', time: 'Estimated' }
                ],
                duration: '5-7 days',
                distance: '11,500 km'
            },
            'sao-tome': {
                origin: 'São Tomé, São Tomé and Príncipe',
                destination: 'Guangzhou, China',
                route: [
                    { location: 'São Tomé, STP', status: 'picked_up', time: '1 hour ago' },
                    { location: 'Accra, Ghana', status: 'in_transit', time: 'Next' },
                    { location: 'Istanbul, Turkey', status: 'pending', time: 'Estimated' },
                    { location: 'Singapore', status: 'pending', time: 'Estimated' },
                    { location: 'Guangzhou, China', status: 'delivered', time: 'Estimated' }
                ],
                duration: '6-8 days',
                distance: '13,200 km'
            },
            'guinea-bissau': {
                origin: 'Bissau, Guinea-Bissau',
                destination: 'Shenzhen, China',
                route: [
                    { location: 'Bissau, Guinea-Bissau', status: 'picked_up', time: '3 hours ago' },
                    { location: 'Casablanca, Morocco', status: 'in_transit', time: 'Next' },
                    { location: 'Paris, France', status: 'pending', time: 'Estimated' },
                    { location: 'Seoul, South Korea', status: 'pending', time: 'Estimated' },
                    { location: 'Shenzhen, China', status: 'delivered', time: 'Estimated' }
                ],
                duration: '7-9 days',
                distance: '14,000 km'
            }
        };
    }

    createShipment(order) {
        const shippingRoute = this.initializeShippingRoutes()[order.country];
        const dhlTrackingNumber = 'DHL' + Math.random().toString().substr(2, 10);
        
        const shipment = {
            id: Date.now(),
            orderId: order.id,
            product: order.product,
            trackingNumber: dhlTrackingNumber,
            carrier: 'DHL Express',
            status: 'picked_up',
            currentLocation: shippingRoute.route[0].location,
            route: shippingRoute.route,
            origin: shippingRoute.origin,
            destination: shippingRoute.destination,
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            createdAt: new Date().toLocaleString(),
            updates: [
                {
                    status: 'picked_up',
                    location: shippingRoute.route[0].location,
                    timestamp: new Date().toLocaleString(),
                    description: 'Package picked up by DHL courier'
                }
            ]
        };

        this.shipments.push(shipment);
        this.saveToStorage();
        
        this.startTrackingSimulation(shipment.id);
        this.sendShippingNotification(shipment, 'created');
        
        return shipment;
    }

    startTrackingSimulation(shipmentId) {
        const shipment = this.shipments.find(s => s.id === shipmentId);
        if (!shipment) return;

        let currentStep = 1;
        
        this.trackingIntervals[shipmentId] = setInterval(() => {
            if (currentStep < shipment.route.length) {
                const routePoint = shipment.route[currentStep];
                
                shipment.status = routePoint.status === 'delivered' ? 'delivered' : 'in_transit';
                shipment.currentLocation = routePoint.location;
                
                shipment.updates.push({
                    status: routePoint.status,
                    location: routePoint.location,
                    timestamp: new Date().toLocaleString(),
                    description: this.getTrackingDescription(routePoint.status, routePoint.location)
                });
                
                this.sendShippingNotification(shipment, routePoint.status);
                this.renderTrackingView();
                
                if (routePoint.status === 'delivered') {
                    clearInterval(this.trackingIntervals[shipmentId]);
                    const order = this.orders.find(o => o.id === shipment.orderId);
                    if (order) {
                        order.delivered = true;
                        this.saveToStorage();
                    }
                }
                
                currentStep++;
            }
        }, 30000);
    }

    getTrackingDescription(status, location) {
        const descriptions = {
            'picked_up': `Package picked up by DHL courier from ${location}`,
            'in_transit': `Package in transit to next facility in ${location}`,
            'processed': `Package processed at DHL facility in ${location}`,
            'departed': `Package departed from ${location} facility`,
            'arrived': `Package arrived at ${location} distribution center`,
            'out_for_delivery': `Package out for delivery in ${location}`,
            'delivered': `Package successfully delivered to recipient in ${location}`
        };
        return descriptions[status] || `Package update: ${status} in ${location}`;
    }

    sendShippingNotification(shipment, updateType) {
        const order = this.orders.find(o => o.id === shipment.orderId);
        if (!order) return;

        const notifications = {
            'created': {
                title: '🚚 DHL Shipment Created',
                message: `Your order of ${shipment.product} is now shipping with DHL. Tracking: ${shipment.trackingNumber}`
            },
            'in_transit': {
                title: '✈️ Shipment In Transit',
                message: `Your package is now in transit to ${shipment.currentLocation}. Expected delivery: ${shipment.estimatedDelivery}`
            },
            'processed': {
                title: '🏭 Package Processed',
                message: `Your package has been processed at DHL facility in ${shipment.currentLocation}`
            },
            'out_for_delivery': {
                title: '🚛 Out for Delivery',
                message: `Your package is out for delivery in ${shipment.currentLocation} today!`
            },
            'delivered': {
                title: '✅ Package Delivered',
                message: `Your package has been successfully delivered to the recipient in ${shipment.destination}`
            }
        };

        const notification = notifications[updateType];
        if (notification) {
            this.showNotification(notification.title, notification.message);
            this.sendEmailNotification(shipment, notification);
        }
    }

    sendEmailNotification(shipment, notification) {
        const emailContent = `
            <div class="bg-white p-6 rounded-lg border border-gray-200">
                <div class="text-center mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/DHL_Express_logo.svg/1280px-DHL_Express_logo.svg.png" 
                         alt="DHL" class="h-8 mx-auto mb-2">
                    <h4 class="font-bold text-lg">${notification.title}</h4>
                </div>
                <div class="space-y-3 text-sm">
                    <p><strong>Product:</strong> ${shipment.product}</p>
                    <p><strong>Tracking Number:</strong> ${shipment.trackingNumber}</p>
                    <p><strong>Current Location:</strong> ${shipment.currentLocation}</p>
                    <p><strong>Status:</strong> ${shipment.status.replace('_', ' ').toUpperCase()}</p>
                    <p><strong>Last Update:</strong> ${new Date().toLocaleString()}</p>
                    <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                        <p class="text-blue-800">${notification.message}</p>
                    </div>
                    <p class="text-gray-600 text-xs mt-4">
                        This is an automated shipping update from AgriLink DHL Integration.
                    </p>
                </div>
            </div>
        `;

        setTimeout(() => {
            this.showEmailModal(emailContent);
        }, 2000);
    }

    showEmailModal(content) {
        document.getElementById('email-content').innerHTML = content;
        document.getElementById('email-modal').classList.remove('hidden');
    }

    closeEmailModal() {
        document.getElementById('email-modal').classList.add('hidden');
    }

    renderTrackingView() {
        this.renderActiveShipments();
        this.renderTrackingTimeline();
    }

    renderActiveShipments() {
        const container = document.getElementById('active-shipments');
        const activeShipments = this.shipments.filter(s => s.status !== 'delivered');
        
        if (activeShipments.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-shipping-fast text-3xl mb-4"></i>
                    <p>No active shipments. Complete an order to track delivery.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = activeShipments.map(shipment => `
            <div class="border-2 border-blue-200 rounded-2xl p-6 bg-blue-50 card-hover">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <h3 class="font-bold text-xl">${shipment.product}</h3>
                            <span class="px-3 py-1 rounded-full text-sm font-medium ${
                                shipment.status === 'picked_up' ? 'bg-yellow-200 text-yellow-800' :
                                shipment.status === 'in_transit' ? 'bg-blue-200 text-blue-800' :
                                'bg-green-200 text-green-800'
                            }">
                                ${shipment.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <p class="text-sm text-gray-600"><strong>DHL Tracking:</strong></p>
                                <p class="font-mono text-lg font-bold">${shipment.trackingNumber}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600"><strong>Current Location:</strong></p>
                                <p class="font-semibold">📍 ${shipment.currentLocation}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600"><strong>Estimated Delivery:</strong></p>
                                <p class="font-semibold">📅 ${shipment.estimatedDelivery}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                            <span><i class="fas fa-route mr-1"></i> ${shipment.distance}</span>
                            <span><i class="fas fa-clock mr-1"></i> ${shipment.duration}</span>
                            <span><i class="fas fa-map-marker-alt mr-1"></i> ${shipment.origin} → ${shipment.destination}</span>
                        </div>
                    </div>
                    
                    <button onclick="agriLink.showShipmentDetails(${shipment.id})" 
                            class="ml-4 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700">
                        <i class="fas fa-satellite-dish mr-2"></i>
                        Track Live
                    </button>
                </div>
                
                <!-- Progress Bar -->
                <div class="mt-4">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                        <span>${shipment.origin}</span>
                        <span>${shipment.destination}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-red-600 h-2 rounded-full" style="width: ${this.calculateProgress(shipment)}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    calculateProgress(shipment) {
        const totalSteps = shipment.route.length;
        const completedSteps = shipment.route.findIndex(point => point.location === shipment.currentLocation) + 1;
        return (completedSteps / totalSteps) * 100;
    }

    showShipmentDetails(shipmentId) {
        const shipment = this.shipments.find(s => s.id === shipmentId);
        if (!shipment) return;

        this.renderTrackingMap(shipment);
        this.renderTrackingTimeline(shipment);
    }

    renderTrackingMap(shipment) {
        const container = document.getElementById('tracking-map');
        
        container.innerHTML = `
            <div class="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
                <!-- Route Line -->
                <div class="absolute top-1/2 left-0 right-0 h-1 bg-red-200 transform -translate-y-1/2"></div>
                
                <!-- Origin and Destination -->
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div class="bg-green-500 text-white p-3 rounded-lg shadow-lg">
                        <i class="fas fa-flag"></i>
                        <div class="text-xs mt-1">Origin</div>
                    </div>
                </div>
                
                <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div class="bg-blue-500 text-white p-3 rounded-lg shadow-lg">
                        <i class="fas fa-flag-checkered"></i>
                        <div class="text-xs mt-1">Destination</div>
                    </div>
                </div>
                
                <!-- Moving Truck -->
                <div class="absolute top-1/2 left-1/3 transform -translate-y-1/2 animate-pulse">
                    <div class="bg-red-600 text-white p-4 rounded-lg shadow-xl">
                        <i class="fas fa-truck"></i>
                        <div class="text-xs mt-1">DHL</div>
                    </div>
                    <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
                </div>
                
                <!-- Current Location -->
                <div class="absolute top-1/2 left-1/3 transform -translate-y-12 bg-white p-2 rounded-lg shadow-lg border">
                    <div class="text-sm font-semibold">🚚 In Transit</div>
                    <div class="text-xs text-gray-600">${shipment.currentLocation}</div>
                </div>
                
                <!-- Map Legend -->
                <div class="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow border">
                    <div class="text-sm font-semibold mb-2">DHL Live Tracking</div>
                    <div class="space-y-1 text-xs">
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 bg-green-500 rounded"></div>
                            <span>Origin: ${shipment.origin}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 bg-red-600 rounded"></div>
                            <span>Current: ${shipment.currentLocation}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 bg-blue-500 rounded"></div>
                            <span>Destination: ${shipment.destination}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTrackingTimeline(shipment = null) {
        const container = document.getElementById('tracking-timeline');
        
        if (!shipment) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-history text-3xl mb-4"></i>
                    <p>Select a shipment to view tracking timeline</p>
                </div>
            `;
            return;
        }

        container.innerHTML = shipment.updates.map(update => `
            <div class="flex items-start space-x-4 p-4 border-2 rounded-xl ${
                update.status === 'delivered' ? 'border-green-300 bg-green-50' :
                update.status === 'picked_up' ? 'border-yellow-300 bg-yellow-50' :
                'border-blue-300 bg-blue-50'
            }">
                <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    update.status === 'delivered' ? 'bg-green-500 text-white' :
                    update.status === 'picked_up' ? 'bg-yellow-500 text-white' :
                    'bg-blue-500 text-white'
                }">
                    <i class="fas fa-${this.getTrackingIcon(update.status)}"></i>
                </div>
                <div class="flex-1">
                    <h4 class="font-semibold">${update.description}</h4>
                    <div class="flex justify-between items-center mt-2">
                        <span class="text-sm text-gray-600">
                            <i class="fas fa-map-marker-alt mr-1"></i>
                            ${update.location}
                        </span>
                        <span class="text-sm text-gray-500">${update.timestamp}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getTrackingIcon(status) {
        const icons = {
            'picked_up': 'box-open',
            'in_transit': 'plane',
            'processed': 'warehouse',
            'departed': 'paper-plane',
            'arrived': 'building',
            'out_for_delivery': 'truck',
            'delivered': 'check-circle'
        };
        return icons[status] || 'info-circle';
    }

    // RATING SYSTEM METHODS
    openRatingModal(order, rateeType) {
        this.ratingContext = { order, rateeType };
        const modal = document.getElementById('rating-modal');
        const title = document.getElementById('modal-title');
        const starsContainer = document.getElementById('stars-container');
        
        if (rateeType === 'farmer') {
            title.textContent = `Rate Farmer: ${order.farmer.name}`;
        } else {
            title.textContent = `Rate Buyer Experience`;
        }
        
        starsContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'text-3xl text-gray-300 cursor-pointer';
            star.innerHTML = '<i class="far fa-star"></i>';
            star.dataset.rating = i;
            star.onclick = () => this.setStarRating(i);
            starsContainer.appendChild(star);
        }
        
        modal.classList.remove('hidden');
    }

    setStarRating(rating) {
        const stars = document.querySelectorAll('#stars-container span');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.innerHTML = '<i class="fas fa-star"></i>';
                star.className = 'text-3xl text-yellow-400 cursor-pointer';
            } else {
                star.innerHTML = '<i class="far fa-star"></i>';
                star.className = 'text-3xl text-gray-300 cursor-pointer';
            }
        });
    }

    closeRatingModal() {
        document.getElementById('rating-modal').classList.add('hidden');
        this.ratingContext = null;
    }

    submitRating() {
        if (!this.ratingContext) return;
        
        const stars = document.querySelectorAll('#stars-container span.fas.fa-star');
        const rating = stars.length;
        const comment = document.getElementById('rating-comment').value;
        
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        const ratingData = {
            id: Date.now(),
            orderId: this.ratingContext.order.id,
            product: this.ratingContext.order.product,
            rateeType: this.ratingContext.rateeType,
            rateeName: this.ratingContext.rateeType === 'farmer' ? this.ratingContext.order.farmer.name : 'Chinese Buyer',
            rating: rating,
            comment: comment,
            timestamp: new Date().toLocaleString()
        };

        this.ratings.push(ratingData);
        
        if (this.ratingContext.rateeType === 'farmer') {
            const farmer = this.ratingContext.order.farmer;
            const product = this.products.find(p => p.id === this.ratingContext.order.productId);
            if (product) {
                const newTotalRatings = product.farmer.totalRatings + 1;
                const newRating = ((product.farmer.rating * product.farmer.totalRatings) + rating) / newTotalRatings;
                product.farmer.rating = Math.round(newRating * 10) / 10;
                product.farmer.totalRatings = newTotalRatings;
            }
        }

        this.ratingContext.order.rated = true;
        
        this.saveToStorage();
        this.closeRatingModal();
        this.renderRatingsView();
        this.renderProducts();
        
        this.showNotification(`⭐ Rating Submitted!`, `
            Thank you for your ${rating}-star rating!<br>
            Your feedback helps build trust in our community.
        `);
    }

    renderRatingsView() {
        this.renderRateFarmerSection();
        this.renderRateBuyerSection();
        this.renderRatingHistory();
    }

    renderRateFarmerSection() {
        const container = document.getElementById('rate-farmer-section');
        const completedOrders = this.orders.filter(o => o.completed && !o.rated);
        
        if (completedOrders.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-star text-3xl mb-4"></i>
                    <p>Complete an order to rate farmers</p>
                </div>
            `;
            return;
        }

        container.innerHTML = completedOrders.map(order => `
            <div class="border border-gray-200 rounded-lg p-4 mb-3">
                <div class="flex justify-between items-center mb-2">
                    <div>
                        <strong>${order.product}</strong>
                        <div class="text-sm text-gray-600">Farmer: ${order.farmer.name}</div>
                    </div>
                    <button onclick="agriLink.openRatingModal(${JSON.stringify(order).replace(/"/g, '&quot;')}, 'farmer')" 
                            class="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm">
                        <i class="fas fa-star mr-1"></i>Rate Farmer
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderRateBuyerSection() {
        const container = document.getElementById('rate-buyer-section');
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-user-tie text-3xl mb-4"></i>
                <p>Farmers can rate buyers here after order completion</p>
            </div>
        `;
    }

    renderRatingHistory() {
        const container = document.getElementById('rating-history');
        
        if (this.ratings.length === 0) {
            container.innerHTML = '<div class="text-center py-4 text-gray-500">No ratings yet</div>';
            return;
        }

        container.innerHTML = this.ratings.map(rating => `
            <div class="border-b border-gray-200 py-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <strong>${rating.product}</strong>
                        <div class="text-sm text-gray-600">
                            Rated ${rating.rateeType}: ${rating.rateeName}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="rating-stars">
                            ${this.generateStarRating(rating.rating)}
                        </div>
                        <div class="text-sm text-gray-500">${rating.timestamp}</div>
                    </div>
                </div>
                ${rating.comment ? `<p class="text-gray-700 mt-2">"${rating.comment}"</p>` : ''}
            </div>
        `).join('');
    }

    // REMAINING METHODS
    renderFarmerOrders() {
        const container = document.getElementById('farmer-orders');
        
        if (this.orders.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-4"></i>
                    <p class="text-lg">No orders yet. Chinese buyers will appear here!</p>
                    <p class="text-sm mt-2">When orders arrive, you can accept them and get instant pre-financing</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.orders.map(order => `
            <div class="border-2 ${order.completed ? 'border-green-300 bg-green-50' : order.farmerAccepted ? 'border-yellow-300 bg-yellow-50' : 'border-blue-300 bg-blue-50'} rounded-2xl p-6 mb-4 card-hover">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <h3 class="font-bold text-xl">${order.product}</h3>
                            <span class="px-3 py-1 rounded-full text-sm font-medium ${
                                order.completed ? 'bg-green-200 text-green-800' :
                                order.farmerAccepted ? 'bg-yellow-200 text-yellow-800' :
                                'bg-blue-200 text-blue-800'
                            }">
                                ${order.completed ? '✅ Completed' :
                                  order.farmerAccepted ? '🔄 In Production' : '📝 New Order'}
                            </span>
                            <span class="bg-${order.country === 'mozambique' ? 'green' : order.country === 'sao-tome' ? 'yellow' : 'red'}-100 text-${order.country === 'mozambique' ? 'green' : order.country === 'sao-tome' ? 'yellow' : 'red'}-800 px-3 py-1 rounded-full text-sm">
                                ${this.getCountryFlag(order.country)}
                            </span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p class="text-gray-600"><i class="fas fa-dollar-sign text-green-500 mr-2"></i><strong>Price:</strong> ${order.price}</p>
                                <p class="text-gray-600"><i class="fas fa-box text-blue-500 mr-2"></i><strong>Quantity:</strong> ${order.unit}</p>
                                <p class="text-gray-600"><i class="fas fa-leaf text-green-500 mr-2"></i><strong>Sustainability:</strong> ${order.sustainability}%</p>
                            </div>
                            <div>
                                <p class="text-gray-600"><i class="fas fa-fingerprint text-purple-500 mr-2"></i><strong>TX Hash:</strong> ${order.txHash}</p>
                                <p class="text-gray-600"><i class="fas fa-clock text-orange-500 mr-2"></i><strong>Ordered:</strong> ${order.timestamp}</p>
                                ${order.completedAt ? `<p class="text-gray-600"><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>Completed:</strong> ${order.completedAt}</p>` : ''}
                            </div>
                        </div>

                        ${order.preFinance ? `
                            <div class="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                                <p class="text-green-800 font-semibold">
                                    <i class="fas fa-hand-holding-usd mr-2"></i>
                                    Pre-finance Approved: ${order.preFinance}
                                </p>
                            </div>
                        ` : ''}

                        ${order.completed && !order.rated ? `
                            <div class="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                                <p class="text-yellow-800">
                                    <i class="fas fa-star mr-2"></i>
                                    <strong>Rate this transaction:</strong> Share your experience with the buyer
                                </p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="flex flex-col space-y-2 ml-6">
                        ${!order.farmerAccepted ? `
                            <button onclick="agriLink.acceptOrder(${order.id})" class="agri-green text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap">
                                <i class="fas fa-handshake mr-2"></i>
                                Accept & Get Pre-Finance
                            </button>
                        ` : !order.completed ? `
                            <button onclick="agriLink.completeOrder(${order.id})" class="agri-blue text-white px-6 py-3 rounded-xl font-semibold">
                                <i class="fas fa-shipping-fast mr-2"></i>
                                Mark as Delivered
                            </button>
                        ` : `
                            <div class="bg-green-100 text-green-800 px-6 py-3 rounded-xl text-center font-semibold">
                                <i class="fas fa-check-circle mr-2"></i>
                                Successfully Completed
                            </div>
                            ${!order.rated ? `
                                <button onclick="agriLink.openRatingModal(${JSON.stringify(order).replace(/"/g, '&quot;')}, 'buyer')" class="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold">
                                    <i class="fas fa-star mr-2"></i>
                                    Rate Buyer
                                </button>
                            ` : ''}
                        `}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderBlockchainSteps() {
        const container = document.getElementById('blockchain-steps');
        const activeOrders = this.orders.filter(o => !o.completed);
        
        if (activeOrders.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-project-diagram text-3xl mb-4"></i>
                    <p>No active transactions. Place an order to see blockchain verification in action.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = activeOrders.map(order => `
            <div class="border-2 border-purple-200 rounded-2xl p-6 bg-purple-50">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-lg">${order.product}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="bg-${order.country === 'mozambique' ? 'green' : order.country === 'sao-tome' ? 'yellow' : 'red'}-100 text-${order.country === 'mozambique' ? 'green' : order.country === 'sao-tome' ? 'yellow' : 'red'}-800 px-2 py-1 rounded-full text-sm">
                            ${this.getCountryFlag(order.country)}
                        </span>
                        <span class="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            TX: ${order.txHash.substring(0, 16)}...
                        </span>
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${[
                        { step: 'Smart Contract Created', status: 'completed', icon: '📝' },
                        { step: 'Quality Verification', status: 'completed', icon: '🔍' },
                        { step: 'Pre-Finance Approved', status: order.farmerAccepted ? 'completed' : 'pending', icon: '💰' },
                        { step: 'Shipment Tokenized', status: order.farmerAccepted ? 'completed' : 'pending', icon: '⛓️' },
                        { step: 'Payment Released', status: order.completed ? 'completed' : 'pending', icon: '💳' }
                    ].map((item, index) => `
                        <div class="flex items-center space-x-4 p-3 border-2 rounded-xl ${
                            item.status === 'completed' ? 'border-green-300 bg-green-100' : 'border-gray-300 bg-gray-100'
                        }">
                            <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                item.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                            }">
                                <span class="text-lg">${item.icon}</span>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold">${item.step}</h4>
                                <p class="text-sm text-gray-600 ${
                                    item.status === 'completed' ? 'text-green-700' : 'text-gray-500'
                                }">
                                    ${item.status === 'completed' ? '✅ Verified on blockchain' : '⏳ Waiting for action...'}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const completedOrders = this.orders.filter(o => o.completed).length;
        const pendingOrders = this.orders.filter(o => !o.completed).length;
        
        document.getElementById('active-trades').textContent = 156 + pendingOrders;
        document.getElementById('trade-volume').textContent = `$${(3.2 + (completedOrders * 0.15)).toFixed(1)}M`;
        document.getElementById('carbon-offset').textContent = (1847 + (completedOrders * 75)) + ' tons';
        document.getElementById('farmers-supported').textContent = 1127 + completedOrders;
    }

    updateImpactMetrics() {
        const completedOrders = this.orders.filter(o => o.completed).length;
        
        document.getElementById('impact-carbon').textContent = (1847 + (completedOrders * 75)).toLocaleString();
        document.getElementById('impact-farmers').textContent = (1127 + completedOrders).toLocaleString();
        document.getElementById('impact-volume').textContent = `$${(3.2 + (completedOrders * 0.15)).toFixed(1)}M`;
        document.getElementById('impact-trades').textContent = (156 + completedOrders).toLocaleString();
    }

    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-white border-l-4 border-green-500 shadow-2xl rounded-xl p-4 max-w-sm z-50 transform transition-all duration-300';
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                </div>
                <div class="ml-3">
                    <h4 class="font-bold text-gray-900">${title}</h4>
                    <div class="mt-1 text-sm text-gray-600">${message}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    saveToStorage() {
        localStorage.setItem('agrilink-orders', JSON.stringify(this.orders));
        localStorage.setItem('agrilink-ratings', JSON.stringify(this.ratings));
        localStorage.setItem('agrilink-products', JSON.stringify(this.products));
        localStorage.setItem('agrilink-shipments', JSON.stringify(this.shipments));
    }

    loadFromStorage() {
        const savedOrders = localStorage.getItem('agrilink-orders');
        const savedRatings = localStorage.getItem('agrilink-ratings');
        const savedProducts = localStorage.getItem('agrilink-products');
        const savedShipments = localStorage.getItem('agrilink-shipments');
        
        if (savedOrders) this.orders = JSON.parse(savedOrders);
        if (savedRatings) this.ratings = JSON.parse(savedRatings);
        if (savedProducts) this.products = JSON.parse(savedProducts);
        if (savedShipments) {
            this.shipments = JSON.parse(savedShipments);
            this.shipments.filter(s => s.status !== 'delivered').forEach(shipment => {
                this.startTrackingSimulation(shipment.id);
            });
        }
    }
}

// Global functions for HTML onclick
function showView(viewName) {
    agriLink.showView(viewName);
}

function filterProducts(country) {
    agriLink.filterProducts(country);
}

function placeOrder(productId) {
    agriLink.placeOrder(productId);
}

function closeRatingModal() {
    agriLink.closeRatingModal();
}

function submitRating() {
    agriLink.submitRating();
}

function showShipmentDetails(shipmentId) {
    agriLink.showShipmentDetails(shipmentId);
}

function closeEmailModal() {
    agriLink.closeEmailModal();
}

// Initialize the app
const agriLink = new AgriLink();

// Add CSS for navigation buttons
const style = document.createElement('style');
style.textContent = `
    .nav-btn {
        padding: 10px 16px;
        border-radius: 10px;
        font-weight: 600;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        font-size: 14px;
    }
    .nav-btn.active {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        transform: scale(1.05);
    }
    .nav-btn:not(.active) {
        color: #6b7280;
        border: 2px solid #e5e7eb;
    }
    .nav-btn:not(.active):hover {
        border-color: #10b981;
        color: #10b981;
    }
    .view {
        display: none;
    }
    .view.active {
        display: block;
    }
    .country-filter.active {
        background: #1f2937 !important;
        transform: scale(1.05);
    }
    .rating-stars {
        color: #fbbf24;
    }
`;
document.head.appendChild(style);