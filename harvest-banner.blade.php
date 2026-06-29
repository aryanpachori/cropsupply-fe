<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <title>Harvest Intelligence — CropSupply</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    body { background: #f5f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .role-btn, .crop-btn { transition: all .15s; }
    .role-btn:focus, .crop-btn:focus { box-shadow: none; }
    .form-control:focus { border-color: #0F6E56 !important; box-shadow: none; }
    .step-dot { transition: background .2s, color .2s; }
    .step-line { transition: background .2s; }
  </style>
</head>
<body class="p-4">

{{-- ═══════════════════════════════════════════════════════════
     COMING SOON BANNER
════════════════════════════════════════════════════════════ --}}
<div class="rounded-4 p-4 p-md-5 mb-4" style="background:#085041;">

  {{-- Top row --}}
  <div class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
    <div>
      <span class="badge rounded-pill fw-medium text-uppercase d-inline-block"
            style="background:rgba(255,255,255,.15);color:#fff;font-size:9px;letter-spacing:.08em;">
        Launching Tuesday · Soft launch
      </span>
      <h2 class="fw-medium text-white mt-3 mb-1" style="font-size:1.4rem;">Harvest Intelligence</h2>
      <p class="mb-0" style="font-size:11px;color:rgba(255,255,255,.6);max-width:520px;line-height:1.6;">
        The world's first ward-level crop supply intelligence platform.
        Know what's being grown, where, and when — before it reaches market.
      </p>
    </div>
    <div class="text-end flex-shrink-0">
      <div class="fw-medium text-white" style="font-size:2.2rem;line-height:1;">260K+</div>
      <div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:4px;">farm data · harvest forecast per stages</div>
    </div>
  </div>

  {{-- Feature grid --}}
  @php
  $features = [
    ['icon'=>'📍','title'=>'Country → Region → Ward → Crop drill-down','sub'=>'Tanzania, Kenya, Uganda — customized per country. Ward-level granularity nobody else has.','soon'=>false],
    ['icon'=>'🌱','title'=>'Forecasted volume per farming stage','sub'=>'See exactly how many kg of any crop is at each of the 19 stages right now — from field inspection to crop storage.','soon'=>false],
    ['icon'=>'⏱','title'=>'Live harvest countdown by location','sub'=>'Days until first supply hits each aggregation point — village warehouse, local market, port.','soon'=>false],
    ['icon'=>'📈','title'=>'Price direction signals','sub'=>'Large supply incoming → price drop flag. Low supply → spike warning. Per crop, per location, per season.','soon'=>false],
    ['icon'=>'🤝','title'=>'RFQ matching — demand to incoming supply','sub'=>'Your demand for 400kg Maize matched to incoming Arusha harvest in 12 days automatically.','soon'=>false],
    ['icon'=>'📋','title'=>'Contract farming — stages 1–9','sub'=>'Lock forward contracts with farmers still growing. Factories and exporters secure supply before it reaches market.','soon'=>false],
    ['icon'=>'📱','title'=>'WhatsApp & SMS pre-harvest registration','sub'=>'Farmers register harvest via WhatsApp in any language. NLP extracts intent. Agent verifies. Data flows into forecast.','soon'=>false],
    ['icon'=>'🤖','title'=>'AI buyer & supplier matching at scale','sub'=>'AI reaches 10,000+ targeted suppliers or buyers per day. Manages conversations. Delivers qualified leads. Closes deals.','soon'=>true],
    ['icon'=>'🌍','title'=>'Global supply outlook — 37+ countries','sub'=>'Aggregated from MazaoHub + partner agritechs, cooperatives, government boards, NGOs across Africa, India, Latin America.','soon'=>true],
  ];
  @endphp

  <div class="row g-2 mb-4">
    @foreach($features as $f)
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="rounded-3 p-3 d-flex gap-3 align-items-start h-100"
           style="{{ $f['soon'] ? 'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);' : 'background:rgba(255,255,255,.1);' }}">
        <span style="font-size:1.1rem;flex-shrink:0;margin-top:2px;">{{ $f['icon'] }}</span>
        <div>
          <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <span class="fw-medium text-white" style="font-size:11px;line-height:1.35;">{{ $f['title'] }}</span>
            @if($f['soon'])
              <span class="rounded-pill flex-shrink-0"
                    style="font-size:8px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.45);padding:2px 7px;">
                Soon
              </span>
            @endif
          </div>
          <p class="mb-0" style="font-size:9px;color:rgba(255,255,255,.45);line-height:1.55;">{{ $f['sub'] }}</p>
        </div>
      </div>
    </div>
    @endforeach
  </div>

  {{-- Footer stats + CTA --}}
  <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
    <div class="d-flex flex-wrap gap-2" style="font-size:10px;color:rgba(255,255,255,.4);">
      <span>555K+ farmers</span><span>·</span>
      <span>260K+ farm data records</span><span>·</span>
      <span>644K+ soil tests made to date</span><span>·</span>
      <span>14 Tanzania regions</span>
    </div>
    <button type="button"
            class="btn fw-medium flex-shrink-0"
            data-bs-toggle="modal"
            data-bs-target="#earlyAccessModal"
            style="background:#fff;color:#085041;font-size:11px;border-radius:12px;padding:8px 20px;">
      Request early access →
    </button>
  </div>

</div>


{{-- ═══════════════════════════════════════════════════════════
     EARLY ACCESS MODAL
════════════════════════════════════════════════════════════ --}}
<div class="modal fade" id="earlyAccessModal" tabindex="-1" aria-labelledby="earlyAccessModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="max-width:520px;">
    <div class="modal-content border-0 rounded-4 overflow-hidden">

      {{-- Modal header --}}
      <div class="modal-header border-0 p-0">
        <div class="w-100 px-4 py-4" style="background:#085041;">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <span class="badge rounded-pill fw-medium text-uppercase d-inline-block mb-3"
                    style="background:rgba(255,255,255,.15);color:#fff;font-size:9px;letter-spacing:.07em;">
                Early access · Full launch 30 Sept 2026
              </span>
              <h5 class="fw-medium text-white mb-1" style="font-size:1.1rem;">CropSupply AI</h5>
              <p class="mb-0" style="font-size:11px;color:rgba(255,255,255,.6);">
                Be the first to access harvest intelligence when it launches.
              </p>
            </div>
            <button type="button" class="btn-close btn-close-white ms-3 mt-1"
                    data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <div class="modal-body p-4">

        {{-- Step indicators --}}
        <div class="d-flex align-items-center gap-2 mb-4" id="stepIndicators">
          <div id="dot1" class="step-dot d-flex align-items-center justify-content-center rounded-circle fw-medium"
               style="width:24px;height:24px;font-size:10px;background:#0F6E56;color:#fff;">1</div>
          <div id="line1" class="step-line" style="height:1px;width:32px;background:#e5e7eb;"></div>
          <div id="dot2" class="step-dot d-flex align-items-center justify-content-center rounded-circle fw-medium"
               style="width:24px;height:24px;font-size:10px;background:#f3f4f6;color:#9ca3af;">2</div>
          <span id="stepLabel" class="ms-1" style="font-size:10px;color:#9ca3af;">Your details</span>
        </div>

        {{-- ── STEP 1 ── --}}
        <div id="step1">

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              Full name <span class="text-danger">*</span>
            </label>
            <input type="text" id="inputName" class="form-control rounded-3"
                   placeholder="e.g. John Msigwa"
                   style="font-size:11px;border-color:#e5e7eb;" />
          </div>

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              Phone number <span class="text-danger">*</span>
            </label>
            <input type="tel" id="inputPhone" class="form-control rounded-3"
                   placeholder="+255 7XX XXX XXX"
                   style="font-size:11px;border-color:#e5e7eb;" />
          </div>

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              Email
              <span class="fw-normal text-muted" style="font-size:10px;text-transform:none;">(optional)</span>
            </label>
            <input type="email" id="inputEmail" class="form-control rounded-3"
                   placeholder="your@email.com"
                   style="font-size:11px;border-color:#e5e7eb;" />
          </div>

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              I am a
              <span class="fw-normal text-muted" style="font-size:10px;text-transform:none;">(optional)</span>
            </label>
            @php
            $roles = [
              ['id'=>'market_agent',   'emoji'=>'👩‍🌾','label'=>'Market Agent'],
              ['id'=>'market_trader',  'emoji'=>'🛒',  'label'=>'Market Trader'],
              ['id'=>'crop_supplier',  'emoji'=>'🌾',  'label'=>'Crop Supplier'],
              ['id'=>'market_retailer','emoji'=>'🏪',  'label'=>'Market Retailer'],
              ['id'=>'warehouse_op',   'emoji'=>'🏭',  'label'=>'Warehouse Op.'],
              ['id'=>'factory',        'emoji'=>'🏗️', 'label'=>'Factory'],
              ['id'=>'supermarket',    'emoji'=>'🏬',  'label'=>'Supermarket'],
              ['id'=>'exporter',       'emoji'=>'📦',  'label'=>'Exporter'],
              ['id'=>'restaurant',     'emoji'=>'🍽️', 'label'=>'Restaurant'],
              ['id'=>'animal_feeds',   'emoji'=>'🐄',  'label'=>'Animal Feeds'],
              ['id'=>'transporter',    'emoji'=>'🚛',  'label'=>'Transporter'],
              ['id'=>'collateral_mgr', 'emoji'=>'🔒',  'label'=>'Collateral Mgr'],
            ];
            @endphp
            <div class="row g-2">
              @foreach($roles as $r)
              <div class="col-4">
                <button type="button"
                        class="role-btn btn w-100 border rounded-3 py-2 px-1"
                        data-role="{{ $r['id'] }}"
                        style="font-size:9px;color:#4b5563;border-color:#f3f4f6;line-height:1.4;">
                  <div style="font-size:1.1rem;margin-bottom:3px;">{{ $r['emoji'] }}</div>
                  {{ $r['label'] }}
                </button>
              </div>
              @endforeach
            </div>
          </div>

          <button type="button" id="btnContinue"
                  class="btn w-100 fw-medium text-white mt-2"
                  style="background:#0F6E56;font-size:11px;border-radius:12px;padding:12px;opacity:.4;"
                  disabled>
            Continue →
          </button>
          <p class="text-center mt-2 mb-0" style="font-size:9px;color:#9ca3af;">
            Name and phone required. Everything else optional. We'll call to learn more.
          </p>
        </div>

        {{-- ── STEP 2 ── --}}
        <div id="step2" style="display:none;">

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              Country
              <span class="fw-normal text-muted" style="font-size:10px;text-transform:none;">(optional)</span>
            </label>
            <input type="text" id="inputCountry" class="form-control rounded-3"
                   placeholder="e.g. Tanzania, Kenya, India..."
                   style="font-size:11px;border-color:#e5e7eb;" />
          </div>

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              Organisation
              <span class="fw-normal text-muted" style="font-size:10px;text-transform:none;">(optional)</span>
            </label>
            <input type="text" id="inputOrg" class="form-control rounded-3"
                   placeholder="Company or cooperative name"
                   style="font-size:11px;border-color:#e5e7eb;" />
          </div>

          <div class="mb-3">
            <label class="form-label text-uppercase fw-medium" style="font-size:9px;color:#9ca3af;letter-spacing:.07em;">
              Crops you work with
              <span class="fw-normal text-muted" style="font-size:10px;text-transform:none;">(optional — pick any)</span>
            </label>
            @php
            $crops = ['Maize','Rice','Onion','Avocado','Sunflower','Beans','Tomato','Cassava','Banana','Coffee','Sesame','Groundnuts','Sorghum','Wheat','Potato'];
            @endphp
            <div class="d-flex flex-wrap gap-2">
              @foreach($crops as $crop)
              <button type="button"
                      class="crop-btn btn border rounded-pill"
                      data-crop="{{ $crop }}"
                      style="font-size:10px;color:#4b5563;border-color:#f3f4f6;padding:4px 12px;">
                {{ $crop }}
              </button>
              @endforeach
            </div>
          </div>

          {{-- Location --}}
          <div id="locationBox" class="rounded-3 p-3 d-flex align-items-center justify-content-between mb-3"
               style="background:#f9fafb;">
            <div>
              <p class="mb-0 fw-medium" style="font-size:10px;color:#374151;">Share your location?</p>
              <p class="mb-0" style="font-size:9px;color:#9ca3af;margin-top:2px;">
                Helps us match you to relevant supply in your region
              </p>
            </div>
            <button type="button" id="btnLocation"
                    class="btn fw-medium flex-shrink-0"
                    style="font-size:10px;color:#0F6E56;border:1px solid #9FE1CB;background:#E1F5EE;border-radius:10px;padding:6px 14px;">
              Allow
            </button>
          </div>
          <div id="locationGranted" class="rounded-3 p-3 align-items-center gap-2 mb-3"
               style="background:#E1F5EE;display:none;">
            <span>📍</span>
            <span style="font-size:10px;color:#085041;">Location captured — thank you</span>
          </div>

          <div class="d-flex gap-2">
            <button type="button" id="btnBack"
                    class="btn border"
                    style="font-size:11px;color:#9ca3af;border-color:#e5e7eb;border-radius:12px;padding:10px 16px;">
              ← Back
            </button>
            <button type="button" id="btnSubmit"
                    class="btn fw-medium text-white flex-grow-1"
                    style="background:#0F6E56;font-size:11px;border-radius:12px;padding:10px;">
              Request early access →
            </button>
          </div>
          <p class="text-center mt-2 mb-0" style="font-size:9px;color:#9ca3af;">
            Full access opens 30 September 2026. We'll call you before then.
          </p>
        </div>

        {{-- ── SUCCESS ── --}}
        <div id="stepSuccess" class="text-center py-3" style="display:none;">
          <div class="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
               style="width:60px;height:60px;background:#E1F5EE;font-size:1.5rem;">✓</div>
          <h6 class="fw-medium mb-2">You're on the list</h6>
          <p style="font-size:11px;color:#6b7280;line-height:1.6;" class="mb-1">
            We'll reach out to <strong id="successContact"></strong> before 30 September 2026.
          </p>
          <p style="font-size:10px;color:#9ca3af;" class="mb-4">
            555K+ farmers · 260K+ farm records · 644K+ soil tests · 14 regions
          </p>
          <button type="button"
                  class="btn fw-medium text-white px-5"
                  data-bs-dismiss="modal"
                  style="background:#0F6E56;border-radius:12px;padding:10px 32px;">
            Done
          </button>
        </div>

      </div>
    </div>
  </div>
</div>


{{-- ═══════════════════════════════════════════════════════════
     SCRIPTS
════════════════════════════════════════════════════════════ --}}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
$(function () {
  var selectedRole  = '';
  var selectedCrops = [];
  var locationData  = null;

  /* ── Validation ─────────────────────────────────────────── */
  function checkStep1Valid() {
    var name  = $('#inputName').val().trim();
    var phone = $('#inputPhone').val().trim();
    var email = $('#inputEmail').val().trim();
    var valid = name.length > 1 && (phone.length > 7 || email.indexOf('@') !== -1);
    $('#btnContinue').prop('disabled', !valid).css('opacity', valid ? 1 : 0.4);
  }
  $('#inputName, #inputPhone, #inputEmail').on('input', checkStep1Valid);

  /* ── Role toggle ─────────────────────────────────────────── */
  $(document).on('click', '.role-btn', function () {
    var role = $(this).data('role');
    if (selectedRole === role) {
      selectedRole = '';
      $(this).css({ background:'#fff', borderColor:'#f3f4f6', color:'#4b5563', fontWeight:'' });
    } else {
      selectedRole = role;
      $('.role-btn').css({ background:'#fff', borderColor:'#f3f4f6', color:'#4b5563', fontWeight:'' });
      $(this).css({ background:'#E1F5EE', borderColor:'#1D9E75', color:'#085041', fontWeight:'600' });
    }
  });

  /* ── Crop toggle ─────────────────────────────────────────── */
  $(document).on('click', '.crop-btn', function () {
    var crop = $(this).data('crop');
    var idx  = selectedCrops.indexOf(crop);
    if (idx === -1) {
      selectedCrops.push(crop);
      $(this).css({ background:'#E1F5EE', borderColor:'#1D9E75', color:'#085041', fontWeight:'600' });
    } else {
      selectedCrops.splice(idx, 1);
      $(this).css({ background:'#fff', borderColor:'#f3f4f6', color:'#4b5563', fontWeight:'' });
    }
  });

  /* ── Continue → Step 2 ───────────────────────────────────── */
  $('#btnContinue').on('click', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        locationData = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        $('#locationBox').hide();
        $('#locationGranted').css('display', 'flex');
      }, function () {});
    }
    $('#step1').hide();
    $('#step2').show();
    $('#dot2').css({ background:'#0F6E56', color:'#fff' });
    $('#line1').css('background', '#0F6E56');
    $('#stepLabel').text('Tell us more (optional)');
  });

  /* ── Back → Step 1 ───────────────────────────────────────── */
  $('#btnBack').on('click', function () {
    $('#step2').hide();
    $('#step1').show();
    $('#dot2').css({ background:'#f3f4f6', color:'#9ca3af' });
    $('#line1').css('background', '#e5e7eb');
    $('#stepLabel').text('Your details');
  });

  /* ── Location button ─────────────────────────────────────── */
  $('#btnLocation').on('click', function () {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(function (pos) {
      locationData = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      $('#locationBox').hide();
      $('#locationGranted').css('display', 'flex');
    }, function () {});
  });

  /* ── Submit ──────────────────────────────────────────────── */
  $('#btnSubmit').on('click', function () {
    var $btn = $(this);
    $btn.prop('disabled', true).text('Submitting...');

    var payload = {
      name:     $('#inputName').val().trim(),
      phone:    $('#inputPhone').val().trim(),
      email:    $('#inputEmail').val().trim(),
      role:     selectedRole,
      org:      $('#inputOrg').val().trim(),
      country:  $('#inputCountry').val().trim(),
      crops:    JSON.stringify(selectedCrops),
      location: locationData ? JSON.stringify(locationData) : '',
      _token:   $('meta[name="csrf-token"]').attr('content'),
    };

    $.post('/early-access', payload)
      .always(function () {
        // Show success regardless (soft launch — backend optional)
        $('#successContact').text(payload.phone || payload.email);
        $('#step2').hide();
        $('#stepIndicators').hide();
        $('#stepSuccess').show();
        $btn.prop('disabled', false).text('Request early access →');
      });
  });

  /* ── Reset on modal close ────────────────────────────────── */
  $('#earlyAccessModal').on('hidden.bs.modal', function () {
    selectedRole  = '';
    selectedCrops = [];
    locationData  = null;

    $('#inputName, #inputPhone, #inputEmail, #inputCountry, #inputOrg').val('');
    $('#step2, #stepSuccess').hide();
    $('#step1').show();
    $('#stepIndicators').show();
    $('#dot2').css({ background:'#f3f4f6', color:'#9ca3af' });
    $('#line1').css('background', '#e5e7eb');
    $('#stepLabel').text('Your details');
    $('#btnContinue').prop('disabled', true).css('opacity', 0.4);
    $('.role-btn, .crop-btn').css({ background:'#fff', borderColor:'#f3f4f6', color:'#4b5563', fontWeight:'' });
    $('#locationBox').show();
    $('#locationGranted').hide();
  });
});
</script>

</body>
</html>
