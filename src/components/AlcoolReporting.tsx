import "./alcool-reporting.css";

export default function AlcoolReporting() {
  return (
    <section className="wrap section case-reporting" aria-labelledby="reporting-title">
      <div className="reporting-intro">
        <div>
          <span className="label">LATEST UPDATE / NOVEMBER 2026</span>
          <h2 id="reporting-title">Good records.<br />Less guesswork.</h2>
        </div>
        <p className="lead">
          A stock report should help someone run the shop. The first Excel tab now
          answers six everyday questions, with remaining stock highlighted and
          discrepancies clearly marked for review.
        </p>
      </div>
      <figure className="reporting-example">
        <figcaption id="stock-example-caption">
          <strong>The daily stock view</strong>
          <span>Illustrative data · not live business figures</span>
        </figcaption>
        <div className="reporting-table-scroll" role="region" aria-label="Sample daily stock report, scroll horizontally on small screens" tabIndex={0}>
          <table aria-describedby="stock-example-caption">
            <thead>
              <tr>{["Drink", "Start", "Added", "Sold / used", "Corrections", "Left"].map((label) => <th key={label} scope="col">{label}</th>)}</tr>
            </thead>
            <tbody>
              <tr><th scope="row">Example gin · 250ml</th><td>8</td><td>6</td><td>5</td><td>0</td><td>9</td></tr>
              <tr><th scope="row">Example soda · 300ml</th><td>12</td><td>0</td><td>4</td><td>0</td><td>8</td></tr>
              <tr><th scope="row">Example juice · 500ml</th><td>4</td><td>6</td><td>3</td><td>0</td><td>7</td></tr>
            </tbody>
          </table>
        </div>
        <p>Start + Added − Sold / used + Corrections = Left. Bottles assigned to shots are included in used stock.</p>
      </figure>
      <div className="process-grid reporting-process">
        <div className="process-step">
          <span className="label">01 / SIMPLE TO READ</span>
          <h3>Clarity first.</h3>
          <p>The main tab shows bottles and cans. Shots and mixers have their own units and tab. Detailed movements stay available without crowding the everyday view.</p>
        </div>
        <div className="process-step">
          <span className="label">02 / SAVED AUTOMATICALLY</span>
          <h3>A daily record.</h3>
          <p>The server exports the previous day at 12:10am Nairobi time. The laptop checks hourly and downloads missed reports when it reconnects.</p>
        </div>
        <div className="process-step">
          <span className="label">03 / HISTORY PRESERVED</span>
          <h3>Keep the evidence.</h3>
          <p>Simplified copies use the original saved data. Older workbooks remain archived, downloads are checked against their checksums, and edited copies are never silently overwritten.</p>
        </div>
      </div>
    </section>
  );
}
