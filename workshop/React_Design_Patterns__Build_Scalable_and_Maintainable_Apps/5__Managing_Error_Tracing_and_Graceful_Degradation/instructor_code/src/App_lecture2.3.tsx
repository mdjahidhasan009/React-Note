import { Accordion } from './demo/ccp/Accordion';
import Tabs from './examples/lecture_2/EX7_Tabs';

export default function App() {
	return (
		<div className='container mx-auto max-w-xl'>
			<div className='space-y-4'>
				<Accordion>
					<Accordion.Header>Header</Accordion.Header>
					<Accordion.Content>Content</Accordion.Content>
				</Accordion>
				<Accordion>
					<Accordion.Header>Second Accordion</Accordion.Header>
					<Accordion.Content>
						<p className='text-emerald-500'>
							This is <strong>the content</strong> of the second accordion
						</p>
					</Accordion.Content>
				</Accordion>
			</div>
			<div className='my-8'>
				<Tabs>
					<Tabs.List>
						<Tabs.Tab id='tab-1'>Tab 1</Tabs.Tab>
						<Tabs.Tab id='tab-2'>Tab 2</Tabs.Tab>
						<Tabs.Tab id='tab-3'>Tab 3</Tabs.Tab>
						<Tabs.Tab id='tab-4'>Tab 4</Tabs.Tab>
					</Tabs.List>
					<Tabs.Pane id='tab-1' lazyLoad>
						<p>I am Tab 1</p>
					</Tabs.Pane>
					<Tabs.Pane id='tab-2' lazyLoad>
						<p>I am Tab 2</p>
					</Tabs.Pane>
					<Tabs.Pane id='tab-3' lazyLoad>
						<div className='p-6 bg-white'>
							<p>I am Tab 3</p>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quisquam, quos.
							</p>
							<button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
								Click me
							</button>
						</div>
					</Tabs.Pane>
					<Tabs.Pane id='tab-4' lazyLoad>
						<p>I am Tab 4</p>
					</Tabs.Pane>
				</Tabs>
			</div>
		</div>
	);
}

/**
 * The **Compound Component Pattern** in React allows multiple related components to work together as a single unit. Instead of passing multiple props to control child components, compound components communicate implicitly through **context or React’s `children` prop**.

This pattern is useful when you want to design **flexible, reusable UI components** that allow users to compose them in different ways.

**When to Use Compound Components? (Use Cases)**

- **Building UI libraries** – Tabs, Accordions, Dropdowns, Modals, etc.
- **Designing flexible, reusable components** – Form controls, Wizards.
- **When multiple components share a common state** – Controlled components.
- **Improving code readability & maintainability** – Reducing prop drilling.
 */
